const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    admin: { 
        type: Boolean, 
        default: false 
    }
})

//hash password before saving to database
UserSchema.pre('save', function(next){
    const hashedPassword = bcrypt.hash(this.userPassword, 10)
    this.userPassword = hashedPassword
    next()
})

//compare password after send login request
UserSchema.methods.comparePassword = function(incomingUserPassword, cb){
    bcrypt.compare(incomingUserPassword, this.userPassword)
    return cb(null, this)
}

module.exports = mongoose.model('users', UserSchema)