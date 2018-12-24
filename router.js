'use strict';
const express = require('express');
const router = express.Router();
//const config = require('./config');

const main = require('./routers/main');
const users = require('./routers/users');
const img = require('./routers/img');
const report = require('./routers/report');
router.use('/', main);
router.use('/users', users);
router.use('/img', img);
router.use('/report', report);
module.exports = router;
