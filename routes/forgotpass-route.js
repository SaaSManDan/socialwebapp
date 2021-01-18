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

//render forgot password form
router.get('/', (req, res) => {
  res.render('forgot-password');
});



        


module.exports = router;