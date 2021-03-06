'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
//<=====
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');
var session = require('express-session');
//=====>

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/report/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*10
  }
});
const up = upload.fields([{name: 'img', maxCount: 1}]);

router.post('/', up, (req, res, next) => {
  res.redirect('/list');
});



module.exports = router;
