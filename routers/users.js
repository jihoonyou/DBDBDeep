'use strict';
const express = require('express');
const router = express.Router();
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');

router.get('/', wrapper.asyncMiddleware(async (req, res, next) => {
  const user = await db.getQueryResult('SELECT * FROM user');
  res.json(user);
}));

//body에 있는거 보낼 때 
router.post('/insert', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.id;
  const newPW = req.body.pw;
  const newName = req.body.name;
  const newBirth = req.body.birth;
  const newPhone = req.body.phone;
  const newExperience = req.body.experience;
  console.log(await db.getQueryResult(`INSERT INTO 프리랜서 (ID, PW, 개발경력, 핸드폰번호, 나이, 이름) values ('${newID}', '${newPW}','${newExperience}','${newPhone}','${newBirth}','${newName}')`));
  res.json({success: true});
}));

module.exports = router;