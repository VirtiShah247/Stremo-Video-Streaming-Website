const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true,'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'password is required']
    }
    ,
    continueWatching: [{
        videoId: {
            type: String,
        },
        currentTime: {
            type: Number,
        }
    }]
})
const userModel = mongoose.model('UserDetails',userSchema)

module.exports = userModel