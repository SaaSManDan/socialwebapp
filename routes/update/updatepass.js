const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');

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

// parse application/x-www-form-urlencoded
router.use(body.urlencoded({ extended: false }))

// parse application/json
router.use(body.json())

router.get('/', (req, res) => {
  res.send('');
});


router.post('/', (req, res) => {
  
  let userid = req.body.userid;
  let currentpass = req.body.currentpass;
  let newpass = req.body.newpass;
  
  //first check if original password is correct
  let sql1 = 'SELECT * FROM users WHERE user_id = ?'; 
  let query1 = db.query(sql1, userid, (err, results) => {
  
  numRowsOfExistingUsers = results.length;
  //select to see if user exists first then then checks password
   if(numRowsOfExistingUsers > 0){
     //if user exists, check for password
     if(phash.verify(currentpass, results[0].password)){ //if original password input and pass in db match, update new password
        
       const hashedPassword = phash.generate(newpass);
        let sql2 = 'UPDATE users SET password = ? WHERE user_id = ?'; 
        let query2 = db.query(sql2, [hashedPassword, userid], (err, results) => {
             res.send('Password Updated');//send success message
        });
       
      } else { //if original pass input and pass in db dont match, send error
          res.send('Unable to update password.');
      }
   }
  });
  
 
});

module.exports = router;