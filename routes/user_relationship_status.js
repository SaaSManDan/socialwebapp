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
  //check if user has already liked
  let userid = req.body.userid;
  let profileid = req.body.profileid;
  
  let sql = 'SELECT * FROM user_relationships WHERE follower_user_id = ? AND following_user_id = ?'; 
  let query = db.query(sql, [userid, profileid], (err, results) => {
      if(results.length > 0){ //if they are already following
        res.send('true');
      } else { //not following
        res.send('false');
      }
    });
  
 
});

module.exports = router;