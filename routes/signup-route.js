const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');
const nodemailer = require("nodemailer");

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

//Initally render registration form
router.get('/', (req, res) => {
  res.render('sign-up');
});

//get data from form to insert into database
router.post('/', urlencodedParser, (req, res) => {
  let signupdata = {email: req.body.email,
                    username: req.body.username,
                    password: req.body.password }; //parses data
  const hashedPassword = phash.generate(signupdata.password); //add password hasher 
  let sql = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)'; //inserts into db
  let query = db.query(sql, [signupdata.email, signupdata.username, hashedPassword], (err, result) => {
    if(err) throw err;
      if (!err) {
      // res.send('You have succesfully registered');

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
            to: signupdata.email,
            subject: 'Welcome!',
            text: 'Thank you for signing up! In case you forget, your username is: '+signupdata.username
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        res.send('You have succesfully been registered!');
        
      }
  
    })
});


        


module.exports = router;