const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        maxLength: 255
    },
    trigger: { // new-follower, comment-to-post, tag- more will be added in the future
        type: String,
        required: true,
        enum: ['new-follower', 'tag', 'comment-to-post']
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification