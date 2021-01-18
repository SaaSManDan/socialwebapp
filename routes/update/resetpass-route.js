const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

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

//middleware to parse data from forms
const urlencodedParser = body.urlencoded({extended: false});

//create token
let token = crypto.randomBytes(64).toString('hex');

//Initally render registration form
router.get('/', urlencodedParser, (req, res) => {
  let token = req.query.token;
  
  let sql1 = 'SELECT forgot_id FROM forgot_password WHERE forgot_id = ?'; //find token in db
  let query1 = db.query(sql1, [token], (err, results1) => {
    if (results1.length > 0){ //if token exists, render reset page
      res.render('resetpass');
    } else { //if doesnt exist, redirect to front page
      res.redirect('/');
    }
  });
});

//get data from reset to insert into db
router.post('/', urlencodedParser, (req, res) => {
 let token = req.query.token;
 let newpass = req.body.newpass;
  
  let sql1 = 'SELECT user_id FROM forgot_password WHERE forgot_id = ?'; //gets the user id
  let query1 = db.query(sql1, [token], (err, results1) => {
    if (results1.length > 0){ 
          let userid = results1[0].user_id;
         
          //set new password
          const hashedPassword = phash.generate(newpass);
          let sql2 = 'UPDATE users SET password = ? WHERE user_id = ?'; 
          let query2 = db.query(sql2, [hashedPassword, userid], (err, results) => {
              //after password is updated, delete all forget password requests from db where user id = 
              let sql3 = 'DELETE FROM forgot_password WHERE user_id = ?';
              let query3 = db.query(sql3, [userid], (err, result3) => {
                  res.send('Password has been updated!'); //send success message
               });
          });
        
        
       } else {
         res.send('Unable to update password. The token is: '+token);
       }

    });
});  


        


module.exports = router;