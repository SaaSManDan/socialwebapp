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
router.get('/', isAuth, (req, res) => {
  let userid = req.session.userid;
  let sql = "SELECT p.post_id, p.text, p.user_id,(SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount, p.post_time as general_time,'reg' as post_type FROM posts as p WHERE p.user_id = ANY(SELECT r.following_user_id FROM user_relationships as r WHERE r.follower_user_id = ?) UNION ALL SELECT p.post_id, p.text, p.user_id, (SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount, (SELECT repost_time FROM reposts WHERE reposts.reposted_post_id = p.post_id AND reposts.reposted_by_user_id = ?) as general_time, 'repost' as post_type FROM posts as p WHERE p.post_id = ANY (SELECT re.reposted_post_id FROM reposts as re WHERE re.reposted_by_user_id = ?) UNION ALL SELECT p.post_id, p.text, p.user_id, (SELECT username FROM users WHERE user_id = p.user_id) as username, (SELECT count(*) FROM post_likes WHERE liked_post_id = p.post_id) as likecount, (SELECT count(*) FROM reposts WHERE reposted_post_id = p.post_id) as repostcount, (SELECT count(*) FROM post_replies WHERE on_post_id = p.post_id) as replycount, (SELECT repost_time FROM reposts WHERE reposts.reposted_post_id = p.post_id AND reposts.reposted_by_user_id = ANY (SELECT re.reposted_by_user_id FROM reposts as re WHERE re.reposted_by_user_id = ANY (SELECT r.following_user_id FROM user_relationships as r WHERE r.follower_user_id = ?))) as general_time, 'repost' as post_type FROM posts as p WHERE p.post_id =  ANY (SELECT re.reposted_post_id FROM reposts as re WHERE re.reposted_by_user_id = ANY (SELECT r.following_user_id FROM user_relationships as r WHERE r.follower_user_id = ?))ORDER BY general_time DESC"
  
  db.query(sql, [userid, userid, userid, userid, userid], (error, results, fields) => {
   let numRowsOfExistingPosts = results.length;
  //select to see if user exists first then then password
   if(numRowsOfExistingPosts > 0){
       res.render('home', {userid: userid,
                   data: results,
                          moment: moment});
      } 
    }); 
  
});

  

module.exports = router;



