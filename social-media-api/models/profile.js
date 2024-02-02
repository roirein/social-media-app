const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        unique: true
    },
    coverImageUrl: {
        type: String,
        unique: true
    },
    joined: {
        type: Date,
        default: new Date()
    },
    job: {
        type: String,
        minLength: 3
    },
    location: {
        type: String,
        minLength: 5
    },
    bio: {
        type: String,
        minLength: 5,
        maxLength: 256
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

profileSchema.virtual('fullname').get(() => {
    return `${this.firstName} ${this.lastName}`
})

profileSchema.statics.findByUserId = function(userId) {
    return this.findOne({userId})
}

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile