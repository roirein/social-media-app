const express = require('express')
const upload = require('../services/multer/multer.config')
const profileController = require('../controllers/profile')
const isAuth = require('../middlewares/auth')
const {body} = require('express-validator')

const router = express.Router()

router.patch('/image/:imageType', isAuth, upload.single('profile'), profileController.uploadProfileImage)

router.put('/profile/:userId', isAuth, [
    body('displayName').optional({values: 'falsy'}).trim(),
    body('location').optional({values: 'falsy'}).trim().isLength({min: 2}),
    body('job').optional({values: 'falsy'}).trim().isLength({min: 2}),
    body('bio').trim().optional({values: 'falsy'}).isLength({max: 256})
], profileController.updateProfile)

router.get('/profile/:userId', isAuth, profileController.getProfile)

router.post('/friend-request', isAuth, profileController.sendFriendRequest)

module.exports = router