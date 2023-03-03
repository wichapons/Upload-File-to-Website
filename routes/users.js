const express = require('express');
const multer = require('multer');
const router = express.Router();

const storageConfig = multer.diskStorage({
  destination: (req,file,callback)=>{
    callback(null,'uploadImages');
  },
  filename:(req,file,callback)=>{
    callback(null,Date.now()+'-'+file.originalname);
  }
});

const upload =  multer({storage:storageConfig });

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles',upload.single('image'),(req,res)=>{
  const uploadedFile = req.file;
  const userData = req.body;
  console.log(uploadedFile);
  res.redirect('/')
});

module.exports = router;