'use strict';
const express = require('express');
const router = express.Router();

const main = require('./routers/main');
//const users = require('./routers/users');
//const img = require('./routers/img');

router.use('/', main);
//router.use('/users', users);
//router.use('/img', img);

module.exports = router;