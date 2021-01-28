const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
// const moment = require('moment'); // require


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


//where middlware for user auth should be
const isAuth = (req, res, next) => {
  if(req.session.isAuth){
    next();
  } else {
    res.redirect('/login');
  }
};


//get feed from database
router.get('/', isAuth, (req, res) => {
  let userid = req.session.userid;
  let sql = "SELECT profile_picture FROM user_profiles WHERE user_id = ?"
      
  db.query(sql, [userid], (error, results, fields) => {
   let numRowsOfExistingPosts = results.length;
  //select to see if user exists first then then password
   if(numRowsOfExistingPosts > 0){
       res.render('update-profilepic', {userid: userid,
                   data: results});
      } 
    }); 
  
});

  

module.exports = router;





