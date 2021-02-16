# Social Media Web Application
This is a full-stack Twitter-like social media web application.

![GIF Preview of Project](https://s2.gifyu.com/images/socialwebapp-demo-recording.md.gif)

#### Live Project: https://socialwebapp.drodriguez.dev

## Table of Content
* [Stack](#Stack)
* [Features](#Features)
* [Database Schema](#database-schema)
* [Dependencies](#Dependencies)
* [How to run this web application?](#how-to-run-this-web-application)

## Stack
Front-end: CSS

Back-end: Node.JS, Express

Database: MySQL

Other technologies: Amazon S3

## Features

- **Register and sign-in system**
  - An email is sent to the email on a new user upon registration (using nodemailer)
  - A forgot password page is available and an email with a generated token can be sent to reset password
- **Posts Feed**
  - Users can see the posts of those they follow, posts their followers share as well as posts they've shared themselves
  - Users can also see their own posts
  - Users have the ability to like, repost or comment on each post
- **Profile Pages**
  - Include follow buttons & follower/following counters
- **Search Functionality**
  - Users have the ability to search for any posts (based on the text in them) or users by username
- **Settings Functionality** 
  - Users can change their username, bios and profile pictures
  - Users can update their email or password
- **Others**
  - Amazon S3 is used to host profile picture images
  
## Database Schema
![Database schema](https://i.ibb.co/ZRrRssR/Screen-Shot-2021-01-18-at-10-20-51-PM.png)
  
## Dependencies

express

body-parser

ejs

express-session

mysql

path

password-hash

https

nodemailer

moment

multer

multer-s3

aws-sdk

crypto-js

*Others:*

auto-restart.sh
  - For whatever reason, nodemon would not work on my server so I created my own shell script to restart the server upon any new changes to any file within the directories. Run the following command in your shell:
  
```
$ nohup watch -n 1 bash auto-restart.sh &
```


## How to run this web application?
Go to https://socialwebapp.drodriguez.dev for the live project or download the project and install the dependencies above using npm. 












