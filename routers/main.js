//modlue exports는 server.js 에서 모듈로써 부를수 있게 해줌!
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
//<=== session
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');
var session = require('express-session');
// ===>

router.get('/', (req, res, next) => {
  var sess_info = req.session;

         res.render('about', {
             sess : sess_info,
         })
});
router.get('/about', (req, res, next) => {
  var sess_info = req.session;

         res.render('about', {
             sess : sess_info,
         })
});
router.get('/main', (req, res, next) => {
  var sess_info = req.session;

         res.render('main', {
             sess : sess_info,
         })
});



router.get('/register', (req, res, next) => {
  var sess_info = req.session;

         res.render('register', {
             sess : sess_info,
         })
});
router.get('/login', (req, res, next) => {
  var sess_info = req.session;

         res.render('login', {
             sess : sess_info
         })
});



router.get('/request', (req, res, next) => {
  var sess_info = req.session;

         res.render('request', {
             sess : sess_info,
         })
});

router.get('/edit', wrapper.asyncMiddleware(async (req, res, next) => {
  var sess_info = req.session;
  const user_info = await db.getQueryResult(`SELECT * FROM user where ID="${sess_info.name}"`);
  console.log(user_info);
         res.render('edit', {
             sess : sess_info,
             user_info : user_info,
         })
}));
router.get('/list', wrapper.asyncMiddleware(async (req, res, next) => {
  var sess_info = req.session;
  const list_info = await db.getQueryResult(`SELECT * FROM 의뢰목록`);
  console.log(list_info);
         res.render('list', {
             sess : sess_info,
             list_info : list_info
         })
}));

module.exports = router;
