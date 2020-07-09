const express = require('express')
const router = express.Router()
const Member = require('../modals/member')
let loginUser = require('../modals/loginUser')

router.post('/',checkUser,(req,res)=>{
    loginUser.push(req.body.username)
    res.status(200).json({message:'You are succesfully login to EasyEase'})
})

async function checkUser(req,res,next){
    const userName = req.body.username
    await Member.find({username:userName},(err,docs)=>{
        if(err)return res.status(500).json({message: err.message})
        else if(docs.length === 0)return res.status(400).json({message:'Invalid username'})
        else if(docs[0].password===req.body.password)return next()
        return res.status(400).json({message:'Wrong password'})
    })
}


module.exports = router