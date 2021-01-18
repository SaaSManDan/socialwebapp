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
  let newemail = req.body.newemail;
  let password = req.body.password;

  //check if password is correct
  let sql1 = 'SELECT password FROM users WHERE user_id = ?'; 
  let query1 = db.query(sql1, userid, (err, results1) => {
    if (results1.length > 0){
      if(phash.verify(password, results1[0].password)){ // if password is correct
        
        let sql2 = 'UPDATE users SET email=? WHERE user_id = ?'; 
        let query2 = db.query(sql2, [newemail, userid], (err, results2) => {
           if(err) throw err;
              res.send('Password updated successfully.');
            });
        
      } else { //if password is incorrect
         res.send("Password is incorrect.");
      }
    }
    
  });
  
  
  
 
});

module.exports = router;