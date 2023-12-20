const jwt = require('jsonwebtoken')
const HttpError = require('../utils/classes/http-error')

const isAuth = async (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1]
        if (!token) {
            throw new HttpError('unauthorized', 401)
        }
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    throw new HttpError('token expired', 401)
                } else {
                    throw new HttpError('invalid token', 401)
                }
            }
            req.userId = decodedToken._id
            next()
        })
    } catch(err) {
        next(err)
    }
}

module.exports = isAuth