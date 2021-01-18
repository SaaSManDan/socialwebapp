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
  
  //check if user has already liked
  let sql1 = 'SELECT * FROM post_likes WHERE liked_post_id = ? AND liked_by_user_id = ?'; 
  let query1 = db.query(sql1, [postid, userid], (err, results1) => {
    if (results1.length > 0){ //if like exists, allow to dislikle
      let sql2 = 'DELETE FROM post_likes WHERE liked_post_id = ? AND liked_by_user_id = ?'; 
      let query2 = db.query(sql2, [postid, userid], (err, results2) => {
         //this removes like from db
      });
    } else { //if like doesnt already exist, allow to like
      let sql3 = 'INSERT INTO post_likes (liked_post_id, liked_by_user_id)  VALUES (?, ?)'; 
      let query3 = db.query(sql3, [postid, userid], (err, results3) => {
         //this insert like into database
      });
      
    }
  });
  
 
});

module.exports = router;