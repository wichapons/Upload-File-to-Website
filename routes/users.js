const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: (req,file,callback)=>{
    callback(null,'uploadImages');
  },
  filename:(req,file,callback)=>{
    callback(null,Date.now()+'-'+file.originalname);
  }
});

const upload =  multer({storage:storageConfig });

router.get('/',async function(req, res) {
  const data = await db.getDb().collection('users').find().toArray();

  console.log(data);
  res.render('profiles',{userdata:data});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'),async (req,res)=>{
  const uploadedFile = req.file;
  const userData = req.body;
  const filePath = uploadedFile.path.replace(/\\/g, '/'); //the path is started with \\ which should be / so it need to be replaced
  console.log(uploadedFile);
  await db.getDb().collection('users').insertOne({
    name: userData.username,
    imagePath: filePath
  });
  console.log(uploadedFile);
  res.redirect('/')
});

module.exports = router;