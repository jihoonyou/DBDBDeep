'use strict';
const express = require('express'); //import
const app = express();
const router = require('./router');
const bodyParser = require('body-parser'); //db에 send할 때 필요!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', router);


/*app.get('/', function (req, res) {
  res.send('Hello World!');
});*/


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});	