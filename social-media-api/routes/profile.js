const express = require('express')
const upload = require('../services/multer/multer.config')
const profileController = require('../controllers/profile')
const isAuth = require('../middlewares/auth')
const {body} = require('express-validator')

const router = express.Router()

router.patch('/image/:imageType', isAuth, upload.single('profile'), profileController.uploadProfileImage)

router.put('/profile', isAuth, [
    body('birthday').optional({values: 'falsy'}).isDate().isBefore(new Date().toISOString()),
    body('firstName').optional({values: 'falsy'}).trim().isAlpha().isLength({min: 2}),
    body('lastName').optional({values: 'falsy'}).trim().isAlpha().isLength({min: 2}),
    body('bio').trim().optional({values: 'falsy'}).isLength({max: 128})
], profileController.updateProfile)

router.get('/profile/:userId', isAuth, profileController.getProfile)

router.post('/follow', isAuth, profileController.followUser)

module.exports = router