const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
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
  
 res.render('update-pass', {userid: userid});
      
    });
  


  

module.exports = router;





