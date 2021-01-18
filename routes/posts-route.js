const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const moment = require('moment'); // require

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
router.get('/:id', isAuth, (req, res) => {
  let userid = req.session.userid;
  let postid = req.params.id;
  let sql = "SELECT *, (SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount FROM posts as p WHERE post_id = ?"; //select from db
   db.query(sql, postid, (error, results, fields) => {
   let numOfRows = results.length;
     
   if(numOfRows > 0){
     //if post exists, will show replies as well
     let sql2 = "SELECT *, (SELECT username FROM users WHERE user_id = pr.user_id) as username FROM post_replies as pr WHERE on_post_id = ? ORDER BY post_time DESC"; //select from db
     db.query(sql2, postid, (error, results2, fields) => { 
           
     res.render('posts', {userid: userid,
                   data: results,
                   replydata: results2,
                    moment:moment });
         });
                  
      } else {
        res.send("Sorry, this post doesn't exist :/")
        }
   }); 
  
});

module.exports = router;


