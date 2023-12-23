const jwt = require('jsonwebtoken')
const HttpError = require('../utils/classes/http-error')
const User = require('../models/user')

const isAuth = async (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1]
        if (!token) {
            throw new HttpError('unauthorized', 401)
        }
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new HttpError('token expired', 401)
                } else {
                    throw new HttpError('invalid token', 401)
                }
            }
            const user = await User.findById(decodedToken._id)
            const userObject = user.toObject()
            const {password, ...rest} = userObject
            req.user = {
                ...rest
            }
            next()
        })
    } catch(err) {
        next(err)
    }
}

module.exports = isAuth