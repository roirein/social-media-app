const Profile = require('../models/profile')
const { deleteImage } = require('../utils/profileUtils')

const uploadProfileImage = async (req, res, next) => {
    try {
        const profile = await Profile.findByUserId(req.userId)
        if (profile.profileImageUrl) {
            deleteImage(profile.profileImageUrl)
        }
        profile.profileImageUrl = req.file.path
        await profile.save()
        res.status(200).json({message: 'profile image uploaded successfully'})
    } catch(err) {
        next(err)
    }
}

module.exports = {
    uploadProfileImage
}