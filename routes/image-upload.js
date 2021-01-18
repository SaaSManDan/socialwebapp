const express = require('express');
const body = require('body-parser');

const router = express.Router();


const upload = require('../services/image-upload.js');

const singleUpload = upload.single('image');

router.get('/', (req, res) => {
  
  res.send('get request works');
  
});

router.post('/', (req, res) => {
  
  singleUpload(req, res, (err) => {
    
    return res.json({'imageUrl': req.file.location});
  });
  
});

module.exports = router;