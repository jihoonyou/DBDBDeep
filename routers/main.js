//modlue exports는 server.js 에서 모듈로써 부를수 있게 해줌!
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../public/html/index.html'));
});
router.get('/about', (req, res, next) => {
  res.type('html').sendFile(path.join(__dirname, '../public/html/about.html'));
});

module.exports = router;