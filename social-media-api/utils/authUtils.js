const Token = require("../models/tokens")

const validateToken = async (token) => {
    if (!token || !token.token) {
        throw new HttpError('token not exists', 404)
    }
    if (!token.user) {
        throw new HttpError('no user attached to that token', 404)
    }
    if (token.expiresIn.getTime() < new Date().getTime()) {
        throw new HttpError('token expired', 400)
    }
}

module.exports = {
    validateToken
}