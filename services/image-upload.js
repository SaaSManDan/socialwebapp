//const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//dotenv vars
require("dotenv").config();

const secretAccessKey = process.env.SECRETACCESSKEY;
const accessKeyId = process.env.ACCESSKEYID;

aws.config.update({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
  region: 'us-east-1'
});

const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'project1-profilepic-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName:'Testing_meta_data!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;