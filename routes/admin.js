const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    res.sendFile('/home/abi/Desktop/EasyEase/views/admin.html')
})
router.post('/upload',(req,res)=>{
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    sampleFile = req.files.sampleFile;
    uploadPath = '/home/abi/Desktop/EasyEase' + '/views/data/img/' + sampleFile.name;
    sampleFile.mv(uploadPath, function(err) {
        if (err) {
        return res.status(500).send(err);
        }
        res.send('File uploaded to ' + uploadPath);
    });
})

module.exports = router