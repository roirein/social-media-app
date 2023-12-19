const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    expiresIn: {
        type: Date,
        required: true,
        default: new Date().setHours(new Date().getHours() + 1)
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
})

tokenSchema.statics.getUserId = function(token) {
    return this.findOne({token})
}

const Token = mongoose.model('Token', tokenSchema)

module.exports = Token
