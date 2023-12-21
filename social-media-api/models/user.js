const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String
    }
})

userSchema.pre('save', async function(next)  {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, parseInt(process.env.SALT, 10))
        this.password = hashedPassword
        next()
    } catch(error) {
        next(error)
    }
})

userSchema.statics.findByUsername = function(username) {
    return this.findOne({username})
}

userSchema.statics.findByEmail = function(email) {
    return this.findOne({email})
}

module.exports = mongoose.model('User', userSchema)