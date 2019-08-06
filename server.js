'use strict';
const express = require('express'); //import
const app = express();
const router = require('./router');
const bodyParser = require('body-parser'); //db에 send할 때 필요!

//<=== additional for ejs & session
const ejs = require('ejs');   //ejs템플릿을 사용하기 위해서 모듈 불러오는겁니다. npm install ejs --save 명령어로 까시면됩니다.
const session = require('express-session');   //세션모듈받아오기 npm 받으셔야합니다.


app.set('views', __dirname + '/views');   
                                            
                                            
                                            
app.set('view engine', 'ejs');          
app.engine('html', require('ejs').renderFile);  

 app.use(session({          //세션모듈설정
   secret: 'wd213121',
   resave: false,
   saveUninitialized: true
 }));
//additional for ejs & session ===>


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

