const Profile = require('../models/profile')
const User = require('../models/user')
const HttpError = require('../utils/classes/http-error')
const { deleteImage } = require('../utils/profileUtils')
const {validationResult} = require('express-validator')

const uploadProfileImage = async (req, res, next) => {
    try {
        const profile = await Profile.findByUserId(req.userId)
        const imageType = req.params.imageType
        console.log(req.file)
        const fieldName = imageType === 'profile' ? 'profileImageUrl' : 'coverImageUrl'
        if (profile[fieldName]) {
            deleteImage(profile[fieldName])
        }
        profile[fieldName] = req.file.path
        await profile.save()
        res.status(200).json({message: 'profile image uploaded successfully'})
    } catch(err) {
        next(err)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpError('one or more inputs are invalid', 400)
        }
        const profile = await Profile.findByUserId(req.userId)
        if (!profile) {
            throw new HttpError('profile not found', 404)
        }
        Object.keys(req.body).forEach(key => {
            profile[key] = req.body[key]
        })
        await profile.save()
        res.status(200).json({
            profile
        })
    } catch (err) {
        next(err)
    }
}

const getProfile = async (req, res, next) => {
    try {
        if (req.userId !== req.params.userId) {
            throw new HttpError('you cannot edit someone else profile', 403)
        }
        const profile = await Profile.findByUserId(req.params.userId)
        if (!profile) {
            throw new HttpError('profile not found', 404) 
        }
        const user = await User.findById(req.userId, 'username')
        res.status(200).json({
            profile: {
                ...profile.toObject(),
                username: user.username
            }
        })
    } catch(err) {
        next(err)
    }
}

module.exports = {
    uploadProfileImage,
    updateProfile,
    getProfile
}
