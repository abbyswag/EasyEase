require('dotenv').config()
const express = require('express')
const router = express.Router()
const Model = require('../modals/model')
const Member = require('../modals/member')
const loginUser = require('../modals/loginUser')


router.get('/',(req,res)=>{
  res.render('upload')
})


router.post('/checkuser',checkUsername,loginCheck,(req,res)=>{
  res.status(200).json({message:''})
})


router.post('/upload',uploadThumbnail,uploadModel,saveModel,(req, res)=> {
  res.status(200).json({message:'Files uploaded'})
});


router.get('/features',(req,res)=>{
    let modelArr = []
    Model.find({},(err,docs)=>{
        if(err)res.status(500).json({message:err.message})
        else {
            for(let i=0;i<8;i++){
                modelArr.push(docs[i])
            }
            res.status(200).json(modelArr)
        }
    })
})


function loginCheck(req,res,next){
  loginUser.forEach((user,index)=>{
    if(user === req.body.username)return next()
    else if(index===loginUser.length-1)return res.status(400).json({message:'You are not logged in'})
  })
}

function uploadThumbnail(req,res,next){
  let samplePic;
  let filePath;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  samplePic = req.files.thumbnailImg;
  filePath = process.env.DIRNAME + '/views/data/thumbnails/' + samplePic.name;
  samplePic.mv(filePath, function(err) {
      if (err) {
      return res.status(500).send(err);
      }
      next()
  });
}

function uploadModel(req,res,next){
  let sampleFile;
  let filePath;
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  sampleFile = req.files.sampleFile;
  filePath = process.env.DIRNAME + '/uploads/models/' + sampleFile.name;
  sampleFile.mv(filePath, function(err) {
      if (err) {
      return res.status(500).send(err);
      }
      next()
  });
}

async function checkUsername(req,res,next){
  const userName = req.body.username
  await Member.find({username:userName},(err,docs)=>{
    if(err)res.status(500).json({message: err.message})
    else if(docs.length === 0)res.status(400).json({message:'Invalid username'})
    else return next()
  })
}


async function saveModel(req,res,next){
  let samplePic = req.files.thumbnailImg
  let sampleFile = req.files.sampleFile
  const model = new Model({
    title:req.body.title,
    creator:req.body.username,
    category:req.body.category,
    subCategory:req.body.subcategory,
    thumbnailPath:'/data/thumbnails/' + samplePic.name,
    filePath:process.env.DIRNAME + '/uploads/models/' + sampleFile.name
  })
  try{
    await model.save()
    next()
  }catch(err){
    res.status(400).json({message: err.message})
}
}

module.exports = router