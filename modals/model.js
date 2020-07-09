const mongoose = require('mongoose')
const modelSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    creator:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    subCategory:{
        type: String,
        required:true
    },
    likes:{
        type: Number,
        required:true,
        default: 0
    },
    views:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    thumbnailPath:{
        type:String,
        required:true
    },
    filePath:{
        type: String,
        required:true
    },
    addDate:{
        type:Date,
        required:true,
        default: Date.now()
    }
})

module.exports = mongoose.model('model',modelSchema)