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

router.post('/request', wrapper.asyncMiddleware(async (req, res, next) =>{
  const ID = req.body.id;
  const price = req.body.price;
  const experience = req.body.experience;
  const doc = req.body.doc;
  const min = req.body.min;
  const max = req.body.max;


  console.log(await db.getQueryResult(`INSERT INTO 의뢰목록 (의뢰자ID, 금액, 최소경력, 의뢰문서, 최소프리랜서수, 최대프리랜서수) values ('${ID}', '${price}', '${experience}', '${doc}', '${min}', '${max}')`));
  res.send('success');
}));

router.post('/insert', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.id;
  const newPW = req.body.pw;
  const newName = req.body.name;
  const newAge = req.body.age;
  const newPhone = req.body.phone;
  const newExperience = req.body.experience;

  console.log(await db.getQueryResult(`INSERT INTO user (ID, PW, Name, 나이, 핸드폰번호, 개발경력) values ('${newID}', '${newPW}', '${newName}', '${newAge}', '${newPhone}', '${newExperience}')`));
  res.send('success');
}));

router.post('/login', wrapper.asyncMiddleware(async (req, res, next) => {
  const newID = req.body.id;
  const newPW = req.body.pw;

  const user = await db.getQueryResult(`SELECT PW FROM user where ID="${newID}"`);
  if(user[0].PW==newPW) {
    req.session.result=true;
  }
  else {
    req.session.result=false;
  }
  req.session.name = newID;

  res.render('login', {sess : req.session});
}));

router.post('/edit', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.id;
  const newPW = req.body.pw;
  const newName = req.body.name;
  const newAge = req.body.age;
  const newPhone = req.body.phone;
  const newExperience = req.body.experience;

  console.log(await db.getQueryResult(`UPDATE user SET PW='${newPW}', Name='${newName}', 나이='${newAge}', 핸드폰번호='${newPhone}', 개발경력='${newExperience}' WHERE ID='${newID}'` ));

}));

module.exports = router;
