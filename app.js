const express = require('express');
const ejs = require('ejs');
const body = require('body-parser');
const session = require('express-session');
const mysql = require('mysql');
const path = require('path');
const phash = require('password-hash');
const https = require('https');
//var socket = require('socket.io');

var app = express();

let server = app.listen();


app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));



//initialize middleware for session
app.use(session({
  secret: 'key that will sign cookie', //sign cookie saved to browser
  resave: true, //for every request, create new session
  saveUnitialized: true //if we havent modified session, we dont want it to save
}));

//where middlware for user auth should be
const isAuth = (req, res, next) => {
  if(req.session.isAuth){
    next();
  } else {
    res.redirect('/login');
  }
};


//Initally render homepage
app.use('/', require('./routes/login-route')); 

//signup route
app.use('/sign-up', require('./routes/signup-route')); 

//forgot pass route
app.use('/forgot-password', require('./routes/forgotpass-route')); 

//send password reset link
app.use('/routes/sendpassresetlink', require('./routes/sendpassresetlink'));

//reset password route
app.use('/resetpass', require('./routes/update/resetpass-route'));

//login route
app.use('/login', require('./routes/login-route')); 

//Email availability for signup route
app.use('/routes/email_availability_check', require('./routes/email_availability_check')); 

//Username availability for signup route
app.use('/routes/username_availability_check', require('./routes/username_availability_check')); 

//like or dislike post
app.use('/routes/like_sender', require('./routes/like_sender'));

//repost or un-repost post
app.use('/routes/repost_sender', require('./routes/repost_sender'));

//post sender
app.use('/routes/post_sender', require('./routes/post_sender'));

//reply sender
app.use('/routes/reply_sender', require('./routes/reply_sender'));

//user relationship status
app.use('/routes/user_relationship_status', require('./routes/user_relationship_status'));

//sends user relationship request to DB - to follow or unfollow
app.use('/routes/relationship_sender', require('./routes/relationship_sender'));

//like status
app.use('/routes/like_status', require('./routes/like_status'));

//repost status
app.use('/routes/repost_status', require('./routes/repost_status'));

//user homepage
app.use('/home', require('./routes/home-route'));

//posts route
app.use('/posts', require('./routes/posts-route'));

//users profiles route
app.use('/users', require('./routes/users-route'));

//search route
app.use('/search', require('./routes/search-route'));

//settings route
app.use('/settings', require('./routes/settings-route'));

//search request route
app.use('/routes/search-request', require('./routes/search-request'));

//update bio
app.use('/routes/update/updatebio', require('./routes/update/updatebio'));

//update username
app.use('/routes/update/updateusername', require('./routes/update/updateusername'));

//update email route
app.use('/settings/update-email', require('./routes/select/selectemailinfo'));

//update email api
app.use('/routes/update/update-email', require('./routes/update/update-email'));

//update profile
app.use('/settings/editprofile', require('./routes/update/selectprofileinfo.js'));

//users own post feed
app.use('/myposts', require('./routes/myposts-route.js'));

//update password api
app.use('/routes/update/updatepass', require('./routes/update/updatepass.js'));

//get password page
app.use('/settings/update-pass', require('./routes/select/selectpassinfo.js'));

//file & image uploaders
//app.use('/services/image-upload', require('./services/image-upload.js')); 

app.use('/routes/image-upload', require('./routes/image-upload.js')); 

app.use('/settings/update-profilepic', require('./routes/select/selectprofilepic.js'));



//logout route
app.post('/logout', (req, res) =>{
  req.session.destroy((err)=> {
    if(err) throw err;
    res.redirect("/");
  });
});







