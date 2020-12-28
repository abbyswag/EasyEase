require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const memberRouter = require('./routes/member')
const modelRouter = require('./routes/model')
const adminRouter = require('./routes/admin')
const loggerRouter = require('./routes/logger')

// for mongoose connection
mongoose.connect('mongodb://localhost/dbb',{useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(err)=>console.log(err))
db.once('open',()=>console.log('Connected to database'))

//middlewares
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('views'))
app.use(fileUpload())
app.use('/member',memberRouter)
app.use('/model',modelRouter)
app.use('/admin',adminRouter)
app.use('/login',loggerRouter)

//home route
app.get('/',(req,res)=>{
    res.render('index')
})
//other routes
app.get('/community',(req,res)=>{
    res.render('community')
})              


//server started
app.listen(8080,()=>console.log(`Server is started at ${8080}`))