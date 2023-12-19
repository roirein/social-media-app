const express = require('express')
const {body} = require('express-validator')
const User = require('../models/user')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/register', [
    body('username')
    .trim()
    .isLength({min: 3})
    .withMessage('username must be at least 3 charaters long')
    .custom(async (value, {req}) => {
        const isUsernameExist = await User.findByUsername(value)
        if (isUsernameExist) {
            throw new Error('username already exists')
        }
        return true
    }),
    body('email')
    .trim().
    isEmail().
    withMessage('invalid email address').
    custom(async (value, {req}) => {
        const isEmailExists = await User.findByEmail(value)
        if (isEmailExists){
            throw new Error('email already exists')
        }
        return true
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 6, max: 24})
    .withMessage('password must be at least 6 characters and no more than 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/)
    .withMessage('Password must include uppercase letters, lowercase letters, numbers, and special characters'),
    body('confirmPassword').trim().custom((value, {req}) => {
        if (req.body.password !== value) {
            throw new Error('password must be equal to confirm password')
        }
        return true
    })
], authController.registerUser)

router.post('/login', [
    body('email')
    .trim().
    isEmail().
    withMessage('invalid email address'),
    body('password')
    .trim()
    .isLength({min: 6, max: 24})
    .withMessage('password must be at least 6 characters and no more than 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,24}$/)
    .withMessage('Password must include uppercase letters, lowercase letters, numbers, and special characters')
], authController.loginUser)

module.exports = router