const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');

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


//middleware to parse data from forms
const urlencodedParser = body.urlencoded({extended: false});


//Initally render homepage
router.get('/', (req, res) => {
  res.render('login');
});

//get data from login form to check against database
router.post('/', urlencodedParser, (req, res) => {
  let logindata = {username: req.body.username,
                    password: req.body.password }; //parses data
  let sql = "SELECT * FROM users WHERE username = ? OR email = ?"; //select from db
   db.query(sql, [logindata.username, logindata.username], (error, results, fields) => {
   numRowsOfExistingUsers = results.length;
  //select to see if user exists first then then password
   if(numRowsOfExistingUsers > 0){
     //if user exists, check for password
     if(phash.verify(logindata.password, results[0].password)){
        req.session.isAuth = true;
        req.session.userid = results[0].user_id;
        res.redirect('/home'); //render login success*/
       }
      else { //if password incorrect, give error
        //should instead save username or email in username input field
      
         res.send('Your username or password was incorrect.');
      }
      } else { //if user doesnt exist, give error
        
        res.send('Your username or password was incorrect.');
      }
    }); 
  
});

module.exports = router;


