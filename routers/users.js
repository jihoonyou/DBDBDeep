'use strict';
const express = require('express');
const router = express.Router();
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');

// <=== add for Session & ejs
var session = require('express-session');   //세션모듈받아오기 npm 받으셔야합니다.

// add for Session & ejs ===>

router.get('/', wrapper.asyncMiddleware(async (req, res, next) => {
  const user = await db.getQueryResult('SELECT * FROM user');
  res.json(user);
}));

//body에 있는거 보낼 때
router.post('/insert', wrapper.asyncMiddleware(async (req, res, next) =>{
  /*
  const newID = req.body.id;
  //const newPD = req.body.pw;
  const newName = req.body.name;
  const newBirth = req.body.birth;
  const newPhone = req.body.phone;
  const newExperience = req.body.experience;

  console.log(await db.getQueryResult(`INSERT INTO 프리랜서 (ID, 개발경력, 핸드폰번호, 나이, 이름) values ('${newID}', '${newExperience}','${newPhone}','${newBirth},'${newName}')`));
  */

  const newID = req.body.id;
  const newPW = req.body.pw;
  const newName = req.body.name;
  const newAge = req.body.birth;
  const newPhone = req.body.phone;

  console.log(await db.getQueryResult(`INSERT INTO user (ID, PW, Name, 나이, 핸드폰번호) values ('${newID}', '${newPW}', '${newName}', '${newAge}', '${newPhone}')`));
  res.json({success: true});
}));

router.post('/login', wrapper.asyncMiddleware(async (req, res, next) => {
  const newID = req.body.id;
  const newPW = req.body.pw;


  // var sql = "SELECT * FROM user where ID= ?"; //행님이 쓸  sql구문을 이렇게 하시면됩니다 ?는 밑에 설명있습니다.
  // var test = [값]    //여기에 ?표에 들어갈 값을 만들어 줍니다 하나만 들어가면 값하나만 저장하면되고 여러개면 배열로 만들어주시면됩니다.

  // conn.query(sql, test , function(err, results, fields) {    //위에  만들어놓은 sql text 보면 뭐가 어디위치에 작성되는지 대충 보이실겁니다.
                                                                //함수에 results는 디비 불러오고난후의 값이 저기에 다 담겨있습니다.
                                                                //배열안에 객체로 다담겨있습니다. 대충 [{첫번째레커런스값객체},{첫번째레커런스값객체}]
                                                                //예시입니다.  results[0].id 하면 첫번째 레커런스중에 id속성값이 되는겁니다.
  //   if (err) throw err;         // 에러가 있다면 에러를 띄어준다는겁니다 그냥 작성하거나 뺴도 됩니다.
  //
  //    req.session.name = newID; //행님이 하고싶은 작업을 여기에 다작성하고 세션에 아이디값을 저장하고싶으면 이렇게 저장하면됩니다. 보통 비번은 저장안합니다.

  //   res.render('ejs파일 이름', {아무이름 : results, 아무이름2: 아무값}); //마지막으로 랜더를 해주는겁니다 행님이 원하는 작업을 다하고 어떤뷰를 보여주는지 설정하는 겁니다.
                                                        // 첫번째값은 ''안에 행님이 띄우고자하는 뷰파일 이름을 넣으시면 되고 구번쨰는 객체로보내는건데
                                                        // 행님이 ejs 파일에 뭔가의 값을 보내고싶을때 쓰는겁니다.
                                                        // 값이 보내지면 ejd안에서 어떠한 코드를 작성해서 값이 변할때마다 다른값을 보여주는 정적인 뷰가되는겁니다
                                                       //아쉽게도 html파일은 랜더안되서 그냥 res.send()로 하셔야합니다. 템플릿 엔진을 쓰는 이유가 이겁니다.
  // });
  // });


  const user = await db.getQueryResult(`SELECT * FROM 프리랜서 where ID="${newID}"`);
  req.session.name = newID; //행님이 하고싶은 작업을 여기에 다작성하고 세션에 아이디값을 저장하고싶으면 이렇게 저장하면됩니다. 보통 비번은 저장안합니다.

  res.render('login', {sess : req.session.name, result: user});
  //res.render('', {아무이름 : results, 아무이름2: 아무값}); //마지막으로 랜더를 해주는겁니다 행님이 원하는 작업을 다하고 어떤뷰를 보여주는지 설정하는 겁니다.
                                                        // 첫번째값은 ''안에 행님이 띄우고자하는 뷰파일 이름을 넣으시면 되고 구번쨰는 객체로보내는건데
                                                        // 행님이 ejs 파일에 뭔가의 값을 보내고싶을때 쓰는겁니다.
                                                        // 값이 보내지면 ejd안에서 어떠한 코드를 작성해서 값이 변할때마다 다른값을 보여주는 정적인 뷰가되는겁니다
                                                       //아쉽게도 html파일은 랜더안되서 그냥 res.send()로 하셔야합니다. 템플릿 엔진을 쓰는 이유가 이겁니다.
  //res.json(user);
}));

module.exports = router;
