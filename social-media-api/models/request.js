const mongoose = require('mongoose')

const requestsSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
})

requestsSchema.index({ follower: 1, following: 1 }, { unique: true });

const Request = mongoose.model('Request', requestsSchema)

module.exports = Request