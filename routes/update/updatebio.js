const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const router = express.Router();

//Create connetion
const db = mysql.createConnection({
  host: 'localhost',
  user: 'dansvyeu_admin',
  password: 'dani8801',
  database: 'dansvyeu_twitterclone'
});

//Connect
db.connect((err) => {
  if(err) throw err;
  console.log('MySQL Connected!');
  //res.send('Mysql connected...');
});

// parse application/x-www-form-urlencoded
router.use(body.urlencoded({ extended: false }))

// parse application/json
router.use(body.json())

router.get('/', (req, res) => {
  res.send('');
});


router.post('/', (req, res) => {
  
  let userid = req.body.userid;
  let bio = req.body.bio;

  //update fields in db
  let sql = 'UPDATE user_profiles SET bio=? WHERE user_id='+userid; 
  let query = db.query(sql, bio, (err, results) => {
    if(err) throw err;
    res.send('Success');
  });
  
 
});

module.exports = router;