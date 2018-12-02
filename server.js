'use strict';
const express = require('express'); //import
const app = express();
const router = require('./router');
const bodyParser = require('body-parser'); //db에 send할 때 필요!

//<=== additional for ejs & session
const ejs = require('ejs');   //ejs템플릿을 사용하기 위해서 모듈 불러오는겁니다. npm install ejs --save 명령어로 까시면됩니다.
const session = require('express-session');   //세션모듈받아오기 npm 받으셔야합니다.


app.set('views', __dirname + '/views');   //템플릿 엔진을 쓸려고하는 세팅하는겁니다. 첫번쨰꺼는 경로지정하는겁니다.첫번째
                                            //views라는 디렉토리를 쓰겠단 말이고 두번째로 들어간 값은 views의 경로입니다. views안에 ejs파일이 있다는걸 알려주는겁니다.
                                            //행님이 ejs쓰시고 싶으시면 views라는 파일을 만들어서 ejs파일을 관리하는게 좋을겁니다.
                                            //참고로 행님이 쓰시던 html확장자를 ejs로 바꾸시면 ejs로 쓸수있는겁니다 html기본에 문법이 더 추가된거라 똑같이 쓰시면됩니다.
app.set('view engine', 'ejs');           // 그냥 쓰면됩니다. 이렇게 하랍니다.
app.engine('html', require('ejs').renderFile);  //이것도 그냥 쓰면 될겁니다.

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

