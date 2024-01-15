const User = require('../models/user')
const Token = require('../models/tokens')
const Profile = require('../models/profile')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const HttpError = require('../utils/classes/http-error')
const {sendConfirmationEmail, sendResetPasswordLink} = require('../services/emails/mails/emails')
const { validateToken } = require('../utils/authUtils')

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            if (errors.array()[0].path === 'username' || errors.array()[0].path === 'email') {
                throw new HttpError(errors.array()[0].msg, 409)
            }
            throw new HttpError(errors.array()[0].msg, 400)
        }
        const {username, password, email} = req.body
        const confirmationToken = crypto.randomBytes(16).toString('hex')
        const user = new User({
            username,
            email,
            password
        })
        const token = new Token({
            token: confirmationToken,
            expiresIn: new Date(new Date().getTime() + 60*1000),
            user: user._id
        })
        const profile = new Profile({
            userId: user._id
        })
        sendConfirmationEmail(email, confirmationToken)
        await user.save()
        await token.save()
        await profile.save()
        res.status(201).json({user})
    } catch(err) {
        next(err)
    }
}

const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400)
        }
        const user = await User.findByEmail(req.body.email)
        if (!user) {
            throw new HttpError('username or password are incorrect', 401)
        }
        const isEqual = await bcrypt.compare(req.body.password, user.password)
        if (!isEqual) {
            throw new HttpError('username or password are incorrect', 401)
        }
        if (!user.isActive) {
            throw new HttpError('please activate your account by clicking on the confirmation link in your email', 401)
        }
        const accessToken = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
        const refreshToken = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: req.body.rememberMe ? '365d' : '5m'})
        const maxAge = req.body.rememberMe ? 365 * 24 * 60 * 60 : 5 * 60
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Max-Age=${maxAge}; Path=/; SameSite=None; Secure`)
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken,
        })
    } catch(err) {
        next(err)
    }
}

// add token deletion 
const activateAccount = async (req, res, next) => {
    try {
        const token = await Token.findOne({token: req.params.token})
        await validateToken(token)
        const user = await User.findOne({_id: token.user})
        user.isActive = true
        await user.save()
        res.redirect(process.env.CLIENT_URL)
    } catch(err) {
        next(err)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400)
        }
        const user = await User.findByEmail(req.body.email)
        const token = new Token({
            token: crypto.randomBytes(16).toString('hex'),
            expiresIn: new Date(new Date().getTime() + 60*60*1000),
            user: user._id
        })
        await token.save()
        sendResetPasswordLink(req.body.email, token.token)
        res.status(200).json({messgae: 'a link for reset your password sent to your email'})
    } catch(err) {
        next(err)
    }
}

const verifyPasswordToken = async (req, res, next) => {
    try {
        const token = await Token.findOne({token: req.params.token})
        await validateToken(token)
        const user = await User.findById(token.user)
        res.redirect(`${process.env.CLIENT_URL}/reset-password?token=${token.token}&email=${encodeURIComponent(user.email)}`)
    } catch (err) {
        next(err)
    }
}

const changePassword = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400)
        }
        await Token.findOne({token: req.params.token})
        await Token.findOneAndDelete({token: req.params.token})
        const user = await User.findByEmail(req.body.email)
        user.password = req.body.password
        await user.save()
        res.status(200).json({message: 'password changed successfully'})
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        res.setHeader('Set-Cookie', `refreshToken=''; HttpOnly; Max-Age=${new Date(0)}`)
        res.status(200).json({message: 'logged out successfully'})
    } catch(err) {
        next(err)
    }
}

const generateNewAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies['refreshToken']
        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                res.setHeader('Set-Cookie', `refreshToken=''; HttpOnly; Max-Age=${new Date(0)}`)
                if (err.name === 'TokenExpiredError') {
                    throw new HttpError('token expired', 401)
                } else {
                    throw new HttpError('invalid token', 401)
                }
            }
            const accessToken = jwt.sign({_id: decodedToken._id, email: decodedToken.email}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
            res.status(200).json({accessToken})
        })
    } catch (err) {
        next(err)
    }
}

const fecthUser = async (req, res, next) => {
    try {
        const {username, _id} = req.user
        res.status(200).json({
            username, _id
        })
    } catch(e) {
        next(e)
    }
}


module.exports = {
    registerUser,
    loginUser,
    activateAccount,
    resetPassword,
    verifyPasswordToken,
    changePassword,
    logout,
    generateNewAccessToken,
    fecthUser
}