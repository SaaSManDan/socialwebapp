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
  
  let userid = req.body.userid;
  let profileid = req.body.profileid;
  
  //check if user is already following
  let sql1 = 'SELECT * FROM user_relationships WHERE follower_user_id = ? AND following_user_id = ?'; 
  let query1 = db.query(sql1, [userid, profileid], (err, results1) => {
    if (results1.length > 0){ //if relationship exists, allow to unfollow
      let sql2 = 'DELETE FROM user_relationships WHERE follower_user_id = ? AND following_user_id = ?'; 
      let query2 = db.query(sql2, [userid, profileid], (err, results2) => {
         //this removes relationship from db
        res.send('Unfollow successful');
      });
    } else { //if no relationship exists, allow to follow
      let sql3 = 'INSERT INTO user_relationships (follower_user_id, following_user_id)  VALUES (?, ?)'; 
      let query3 = db.query(sql3, [userid, profileid], (err, results3) => {
         //this insert relationship into database
        res.send('Follow successful');
      });
      
    }
  });
  
 
});

module.exports = router;