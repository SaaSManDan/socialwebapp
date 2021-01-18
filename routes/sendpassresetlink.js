const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

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

//create token
let token = crypto.randomBytes(64).toString('hex');

//Initally render registration form
router.get('/', (req, res) => {
  res.render('');
});

//get data from form to insert into database
router.post('/', urlencodedParser, (req, res) => {
  let usernameoremail = req.body.usernameoremail;
  
  let sql1 = 'SELECT user_id, username, email FROM users WHERE username = ? OR email = ?'; //inserts into db
  let query1 = db.query(sql1, [usernameoremail, usernameoremail], (err, results1) => {
    if (results1.length > 0){ //if user exists, send reset email
          let userid = results1[0].user_id;
          let email = results1[0].email;
          
            let sql2 = 'INSERT INTO forgot_password (user_id, forgot_id) VALUES (?, ?)'; //inserts reset token into db
            let query2 = db.query(sql2, [userid, token], (err, result2) => {
              //after reset token is inserted into db, send reset email
                let transporter = nodemailer.createTransport({
                  host: "server178.web-hosting.com",
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: "no-reply-project1@drodriguez.dev", // generated ethereal user
                    pass: "DCr102404$", // generated ethereal password
                   },
                });


                var mailOptions = {
                  from: '"Project1 No Reply" <no-reply-project1@drodriguez.dev>',
                  to: email,
                  subject: 'Reset Password Request',
                  text: 'You have requested to reset your password, please use this link: https://socialwebapp.drodriguez.dev/resetpass?token='+token
                };

                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
        
            res.send('Request Sent');
              
          });
      
          
        
      } else {
        res.send('Unable to send request.');
      }
    });

});


        


module.exports = router;