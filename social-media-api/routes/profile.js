const express = require('express')
const upload = require('../services/multer/multer.config')
const profileController = require('../controllers/profile')
const isAuth = require('../middlewares/auth')

const router = express.Router()

router.patch('/profile', isAuth, upload.single('profile'), profileController.uploadProfileImage)

module.exports = router