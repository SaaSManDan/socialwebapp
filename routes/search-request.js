const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const moment = require('moment'); // require
const body = require('body-parser');

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



router.post('/', (req, res) => {
  let search = req.body.searchinput;
  let sql1 = "SELECT *, (SELECT username FROM users WHERE user_id = posts.user_id) as username FROM posts WHERE text LIKE ?"; //search for posts
  
  db.query(sql1, ['%' + search + '%'], (error, results1, fields) => {
    let sql2 = "SELECT *, (SELECT bio FROM user_profiles WHERE user_id = users.user_id) as bio FROM users WHERE username LIKE ?"; //search for users
    
    db.query(sql2, ['%' + search + '%'], (error, results2, fields) => {
      res.send({postsdata: results1,
                usersdata: results2}); //return both results
           });
   
        });
            
}); 


  

module.exports = router;




