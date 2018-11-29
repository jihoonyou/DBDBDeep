//modlue exports는 server.js 에서 모듈로써 부를수 있게 해줌!
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../views/index.ejs'));
});
router.get('/about', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../views/about.ejs'));
});
router.get('/register', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../views/register.ejs'));
});
router.get('/login', (req, res, next) => {
  //res.type('html').sendFile(path.join(__dirname, '../views/login.ejs'));
  var sess = req.session;

         res.render('login', {
             sess : sess.name,
             username: sess.username
         })
});
router.get('/afterLogin', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../views/afterLogin.ejs'));
});
module.exports = router;
