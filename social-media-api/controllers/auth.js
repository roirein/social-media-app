const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const HttpError = require('../utils/classes/http-error')

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpError(errors.array()[0].msg, 400)
        }
        const {username, password, email} = req.body
        const user = new User({
            username,
            email,
            password
        })
        await user.save()
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
        const accessToken = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn: req.body.rememberMe ? '365d' : '4h'})
        user.refreshToken = refreshToken
        await user.save()
        res.status(200).json({
            username: user.username,
            email: user.email,
            accessToken
        })
    } catch(err) {
        next(err)
    }
}

module.exports = {
    registerUser,
    loginUser
}