# Social Media Web Application
This is a full-stack Twitter-like social media web application.

## Stack
Front-end: CSS

Back-end: Node.JS, Express

Database: MySQL

Other technologies: Amazon S3

## Project Features

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
  - Users can set change their username, bios and profile pictures
  - Users can update their email or password
- **Others**
  - Amazon S3 is used to host profile picture images
  
## Database Schema
![Database schema](https://i.ibb.co/jG3jKwQ/Screen-Shot-2021-01-18-at-10-11-25-PM.png)
  
## Dependencies
The following dependencies are packages that should be installed using NPM.

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

## How to run this web application?
Go to https://socialwebapp.drodriguez.dev for the live project or download the project and install the dependencies above. 












