const mongoose = require('mongoose')

const relationSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

relationSchema.index({ follower: 1, following: 1 }, { unique: true });

const Relation = mongoose.model('Relation', relationSchema)

module.exports = Relation