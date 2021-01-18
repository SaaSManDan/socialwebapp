const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const router = express.Router();

//dotenv vars
require("dotenv").config();

const hostde = process.env.HOST;
const userde = process.env.USER;
const passwordde = process.env.PASSWORD;
const databasede = process.env.DATABASE;
      

//Create connetion
const db = mysql.createConnection({
  host: hostde,
  user: userde,
  password: passwordde,
  database: databasede
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
  let postid = req.body.postid; 
  let userid = req.body.userid;
  
  let sql = 'SELECT * FROM reposts WHERE reposted_post_id = ? AND reposted_by_user_id = ?'; 
  let query = db.query(sql, [postid, userid], (err, results) => {
      if(results.length > 0){ //repost already exists
        res.send('true');
      } else { //does not
        res.send('false');
      }
    });
  
 
});

module.exports = router;