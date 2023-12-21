const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
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
    birthday: {
        type: Date
    },
    firstName: {
        type: String,
        minLength: 2
    },
    lastName: {
        type: String,
        minLength: 2
    },
    bio: {
        type: String,
        minLength: 5,
        maxLength: 128
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