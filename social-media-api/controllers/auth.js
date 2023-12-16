const User = require('../models/user')
const {validationResult} = require('express-validator')
const HttpError = require('../utils/classes/http-error')

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors.array())
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

module.exports = {
    registerUser
}