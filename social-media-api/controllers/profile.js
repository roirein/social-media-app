const Notification = require('../models/notification')
const Profile = require('../models/profile')
const Relation = require('../models/relation')
const User = require('../models/user')
const socketioHelper = require('../services/socket/socket')
const HttpError = require('../utils/classes/http-error')
const { deleteImage } = require('../utils/profileUtils')
const {validationResult} = require('express-validator')

const uploadProfileImage = async (req, res, next) => {
    try {
        console.log(req.file)
        const profile = await Profile.findByUserId(req.user._id)
        const imageType = req.params.imageType
        const fieldName = imageType === 'profile' ? 'profileImageUrl' : 'coverImageUrl'
        // if (profile[fieldName]) {
        //     deleteImage(profile[fieldName])
        // }

        profile[fieldName] = req.file.filename
        await profile.save()
        res.status(200).json({imageUrl: `http://localhost:${process.env.PORT}/static/images/${req.file.filename}`})
    } catch(err) {
        next(err)
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(errors)
            throw new HttpError('one or more inputs are invalid', 400)
        }
        console.log(req.user._id, req.params.userId)
        if (req.user._id.toString() !== req.params.userId) {
            throw new HttpError('you cannot edit someone else profile', 403)
        }
        const profile = await Profile.findByUserId(req.user._id)
        if (!profile) {
            throw new HttpError('profile not found', 404)
        }
        console.log(req.body)
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
        const profile = await Profile.findByUserId(req.params.userId)
        if (!profile) {
            throw new HttpError('profile not found', 404) 
        }
        const user = await User.findById(req.user._id, 'username')
        const followingAmount = await Relation.find({following: req.params.userId}).countDocuments();
        const followersAmount = await Relation.find({follower: req.params.userId}).countDocuments();
        res.status(200).json({
            profile: {
                ...profile.toObject(),
                coverImageUrl: `http://localhost:${process.env.PORT}/static/images/${profile.coverImageUrl}`,
                profileImageUrl: `http://localhost:${process.env.PORT}/static/images/${profile.profileImageUrl}`,
                username: user.username,
                followingAmount,
                followersAmount
            }
        })
    } catch(err) {
        next(err)
    }
}

const followUser = async (req, res, next) => {
    try {
        const isRelationExist = await Relation.findOne({follower: req.userId, following: req.body.following})
        if (isRelationExist) {
            throw new HttpError('you already follow that user', 409)
        }
        if (req.user._id === req.body.following) {
            throw new HttpError('you cannot follow yourself', 400)
        }
        const relation = new Relation({
            follower: req.user._id,
            following: req.body.following
        })
        const notification = new Notification({
            recipient: req.body.following,
            message: `${req.user.username} started following you`,
            trigger: 'new-follower'
        })
        await notification.save()
        const io = socketioHelper.getIo()
        if (io) {
            io.to(req.body.following).emit('new-follower', notification)
        }
        await relation.save()
        res.status(201).json({message: 'followed successfully'})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    uploadProfileImage,
    updateProfile,
    getProfile,
    followUser
}
