const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    credit:{
        type: Number,
        required:true,
        default: 0
    },
    password:{
        type:String,
        required:true
    },
    joinDate:{
        type:Date,
        required:true,
        default: Date.now()
    }
})

module.exports = mongoose.model('member',memberSchema)