'use strict';
const express = require('express'); //import
const app = express();
const router = require('./router');



app.use('/', router);
/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/
app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});