const express = require('express')
const app = express()
const router = express.Router()
const Member = require('../modals/member')


// get route
router.get('/', async (req,res)=>{
    try{
        const members = await Member.find()
        let membersDataArray = []
        members.forEach((member)=>{
            let membersData = {}
            membersData.username = member.username
            membersData.credit = member.credit
            membersDataArray.push(membersData)
        })
        res.json(membersDataArray)
    }catch (err){
        res.status(500).json({ message : err.message})
    }
})
// get roite by id
router.get('/:id',getMember, (req,res)=>{
    res.json(res.member)
})
// post route
router.post('/',checkForEmail, async (req,res)=>{
    const member = new Member({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const newMember = await member.save()
        res.status(201).json({message: 'You are succesfully signup to EasyEase'})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
async function checkForEmail(req,res,next){
    const newEmail = req.body.email
    await Member.find({email:newEmail},(err,docs)=>{
        if(err)console.log(err)
        else if(docs.length === 0)return next()
        return res.status(400).json({message: 'This email address is already registered'})
    })
}
// update route
router.patch('/:id',(req,res)=>{
    //do later
})
// delete route
router.delete('/:id',getMember,async (req,res)=>{
    try{
        await res.member.remove()
        res.json({message:'Sucessfully deleted'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//middle ware
async function getMember(req,res,next){
    let member
    try{
        member = await Member.findById(req.params.id)
        if(member === null){
            return res.status(404).json({message:'Cannot find the Member'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.member = member
    next()
}

module.exports = router