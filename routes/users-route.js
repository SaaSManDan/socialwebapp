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
  let userprofileid = req.params.id;
  let sql = "SELECT *, (SELECT count(*) FROM user_relationships WHERE follower_user_id = ? AND following_user_id = ?) as followercount, (SELECT count(*) FROM user_relationships WHERE follower_user_id = ?) as followingcount, (SELECT username FROM users WHERE user_id = up.user_id) as username FROM user_profiles as up WHERE user_id = ?"; //select from db
   db.query(sql, [userid, userprofileid, userprofileid, userprofileid], (error, results, fields) => {
   let numOfRows = results.length;
  //select to see if user exists firsts
   if(numOfRows > 0){
     //select posts from db
     
     let sql2 = "SELECT p.post_id, p.text, p.user_id, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount, p.post_time as general_time, 'reg' as post_type FROM posts as p WHERE p.user_id = ? UNION SELECT p.post_id, p.text, p.user_id, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount, (SELECT repost_time FROM reposts WHERE reposts.reposted_post_id = p.post_id AND reposts.reposted_by_user_id = ?) as general_time, 'repost' as post_type FROM posts as p WHERE p.post_id = ANY(SELECT re.reposted_post_id FROM reposts as re WHERE re.reposted_by_user_id = ?) ORDER BY general_time DESC"
     
     db.query(sql2, [userprofileid, userprofileid, userprofileid], (error, results2) => {
       
       res.render('users', {userid: userid,
                   data: results,
                    posts: results2, moment: moment});
   
   });
      } else {
        res.send("Sorry, this user doesn't exist :/")
    }
    }); 
  
});

module.exports = router;



