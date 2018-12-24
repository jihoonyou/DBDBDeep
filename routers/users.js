'use strict';
const express = require('express');
const router = express.Router();
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');

// <=== add for Session & ejs
var session = require('express-session');   //세션모듈받아오기 npm 받으셔야합니다.

// add for Session & ejs ===>


router.post('/request', wrapper.asyncMiddleware(async (req, res, next) =>{
  const ID = req.body.id;
  const price = req.body.price;
  const experience = req.body.experience;
  const doc = req.body.doc;
  const min = req.body.min;
  const max = req.body.max;
  const startdate = req.body.startdate;
  const enddate = req.body.enddate;
  const java = req.body.java;
  const python = req.body.python;
  const cpp = req.body.cpp;
  const spec = req.body.spec;
  const contents = req.body.contents;
  console.log(await db.getQueryResult(`INSERT INTO 의뢰목록 (의뢰자ID, 금액, 최소경력, 의뢰문서, 최소프리랜서수, 최대프리랜서수, 시작날짜, 종료날짜, Java, Python, Cpp) values ('${ID}', '${price}', '${experience}', '${doc}', '${min}', '${max}', '${startdate}', '${enddate}', '${java}', '${python}', '${cpp}')`));
  console.log(await db.getQueryResult(`INSERT INTO 의뢰문서 (의뢰제목, 요구사항, 내용) values ('${doc}', '${spec}', '${contents}')`));
  res.send('success');
}));

router.post('/insert', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.id;
  const newPW = req.body.pw;
  const newName = req.body.name;

  const newAge = req.body.age;
  const newPhone = req.body.phone;
  const newExperience = req.body.experience;

  const newJava = req.body.java;
  const newPython = req.body.python;
  const newCpp = req.body.cpp;

  console.log(await db.getQueryResult(`INSERT INTO user (ID, PW, Name, 나이, 핸드폰번호, 개발경력, Java, Python, Cpp) values ('${newID}', '${newPW}', '${newName}', '${newAge}', '${newPhone}', '${newExperience}', '${newJava}', '${newPython}', '${newCpp}')`));
  res.send('success');
}));

router.post('/login', wrapper.asyncMiddleware(async (req, res, next) => {
  const newID = req.body.id;
  const newPW = req.body.pw;

  const user = await db.getQueryResult(`SELECT * FROM user where ID="${newID}"`);
  if(user[0].PW==newPW) {
    req.session.result=true;
  }
  else {
    req.session.result=false;
  }
  console.log(user[0]);
  req.session.name = newID;
  req.session.user = user[0];

  res.render('login', {sess : req.session });
}));

router.post('/logout', wrapper.asyncMiddleware(async (req, res, next) => {
  req.session.destroy();

  res.send('success');
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

router.post('/listOrder', wrapper.asyncMiddleware(async (req, res, next) =>{
  const cost = req.body.cost;
  const date = req.body.date;
  const none = req.body.none;
  const desc = req.body.desc;

  var item="시작날짜";
  var ord="ASC";

  if(cost=="true") {
    item="금액";
  }
  else if(date=="true"){
    item="시작날짜";
  }

  if(desc=="true") {
    ord="DESC";
  }
  var list_info_def;
  var list_info_asc;

  if(none=="true") {
    //2018-12-10 수정 구인중인 리스트만 시현
    list_info_def=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서수락상태='0') `);
    req.session.list_info=list_info_def;
  }
  else {
    //2018-12-10 수정 구인중인 리스트만 시현
    list_info_asc=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서수락상태='0') ORDER BY ${item} ${ord} `);
    req.session.list_info=list_info_asc;
  }

  res.render('list', {sess : req.session, list_info : req.session.list_info });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/req_listOrder', wrapper.asyncMiddleware(async (req, res, next) =>{
  const cost = req.body.cost;
  const date = req.body.date;
  const none = req.body.none;
  const desc = req.body.desc;

  var newID= req.session.name;

  var item="개발시작날짜";
  var ord="ASC";

  if(cost=="true") {
    item="금액";
  }
  else if(date=="true"){
    item="개발시작날짜";
  }

  if(desc=="true") {
    ord="DESC";
  }
  var list_info_def;
  var list_info_asc;

  if(none=="true") {
    list_info_def=await db.getQueryResult(`SELECT * FROM 신청목록 AS p INNER JOIN (SELECT * FROM 의뢰목록 WHERE 의뢰자ID='${newID}' )AS s on s.의뢰번호 = p.의뢰번호 WHERE 프리랜서수락상태='1' `);
    req.session.ing_list=list_info_def;
  }
  else {
    list_info_asc=await db.getQueryResult(`SELECT * FROM 신청목록 AS p INNER JOIN (SELECT * FROM 의뢰목록 WHERE 의뢰자ID='${newID}' )AS s on s.의뢰번호 = p.의뢰번호 WHERE 프리랜서수락상태='1' ORDER BY ${item} ${ord} `);
    console.log("checkcekcekc");
    console.log(cost);
    console.log(item);
    console.log(list_info_asc);
    console.log("**********");
    req.session.ing_list=list_info_asc;
  }

  res.render('list', {sess : req.session, list_info : req.session.list_info });
}));
/////////////////////////////////////////////////////////////////////////////////////////////////



router.post('/listApply', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.session.name;
  const newlistNum = req.body.listNum;

  var list_app_info=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호= '${newlistNum}' `);
  if(req.session.user.개발경력 < list_app_info[0].최소경력 || req.session.user.Java < list_app_info[0].Java || req.session.user.Python < list_app_info[0].Python || req.session.user.Cpp < list_app_info[0].Cpp ) {
    res.render('list', {sess : req.session, result : 'false', list_info : req.session.list_info });
    console.log('cannot apply this 의뢰');
  }
   else {
     console.log(await db.getQueryResult(`INSERT INTO 신청목록 (의뢰번호, 프리랜서ID) values ('${newlistNum}', '${newID}' )`));
     res.render('list', {sess : req.session, list_info : req.session.list_info });
  }

}));
//free_comp_list



router.post('/comp_listApply', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.session.name;
  const newlistNum = req.body.listNum;


     console.log(await db.getQueryResult(`UPDATE 신청목록 set 프리랜서완료요청='1' where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));
     res.render('list', {sess : req.session, list_info : req.session.list_info });

}));

router.post('/docShow', wrapper.asyncMiddleware(async (req, res, next) =>{
  const cost = req.body.cost;
  const date = req.body.date;
  const none = req.body.none;
  const desc = req.body.desc;
  const docu = req.body.docu;
  var item="시작날짜";
  var ord="ASC";

  if(cost=="true") {
    item="금액";
  }
  else if(date=="true"){
    item="시작날짜";
  }

  if(desc=="true") {
    ord="DESC";
  }
  var list_info_def;
  var list_info_asc;
  var docu_info;
  if(none=="true") {
    //2018-12-10 수정 구인중인 리스트만 시현
    list_info_def=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서수락상태='0') `);
    req.session.list_info=list_info_def;
  }
  else {
    //2018-12-10 수정 구인중인 리스트만 시현
    list_info_asc=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서수락상태='0') ORDER BY ${item} ${ord} `);
    req.session.list_info=list_info_asc;
  }

  docu_info = await db.getQueryResult(`SELECT * FROM 의뢰문서 WHERE 의뢰제목='${docu}'`);
  req.session.docu_info = docu_info[0];
  res.render('list', {sess : req.session, list_info : req.session.list_info });
}));


//////////////////////////////////////////////////////////////////////////////////////////////
//acceptApply
router.post('/acceptApply', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.freeID;
  const newlistNum = req.body.listNum;


     console.log(await db.getQueryResult(`UPDATE 신청목록 set 프리랜서수락상태='1', 개발시작날짜=CURDATE() where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));
     res.render('apply', {sess : req.session });

}));

//comp_listApply
//where??
router.post('/comp_listApply', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.session.name;
  const newlistNum = req.body.listNum;


     console.log(await db.getQueryResult(`UPDATE 신청목록 set 프리랜서완료요청='1' where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));
     res.render('list', {sess : req.session, list_info : req.session.list_info });

}));

//의뢰거절 재신청
//reject_comp_listApply
router.post('/reject_comp_listApply', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.session.name;
  const newlistNum = req.body.reject_listNum;

     console.log(await db.getQueryResult(`UPDATE 신청목록 set 프리랜서완료요청='1', 거부사유='', 의뢰자수락상태 ='0' where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));

     res.render('list', {sess : req.session, list_info : req.session.list_info });

}));

////////
router.post('/free_comp_list', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.freeID;
  const newlistNum = req.body.listNum;
  const free_rate = req.body.rate;


     console.log(await db.getQueryResult(`UPDATE 신청목록 set 의뢰자수락상태='1', 개발완료날짜=CURDATE() where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));
     var free_info=await db.getQueryResult(`SELECT 평점, 평가수 FROM user where ID= '${newID}' `);

    // console.log(free_info);
    // console.log(newID);
     //내적 포트폴리오를 업데이트 합니다.
     var docu_update = await db.getQueryResult ( `SELECT * FROM 의뢰목록 AS p INNER JOIN (SELECT * FROM 의뢰문서) AS s on p.의뢰문서 = s.의뢰제목  WHERE 의뢰자ID = '${req.session.name}' AND 의뢰번호='${newlistNum }'`);
     console.log(docu_update);


     console.log(await db.getQueryResult (`INSERT INTO 내적포트폴리오 (프리랜서ID, 제목, 의뢰번호, 주제설명) values ('${newID}', '${docu_update[0].의뢰제목}', '${newlistNum}', '${docu_update[0].내용}') `));


     var sum_rate=free_info[0].평점;
     var sum_rate_count=free_info[0].평가수;
     sum_rate = sum_rate+free_rate;
     sum_rate_count=sum_rate_count+1;
     console.log(await db.getQueryResult(`UPDATE user set 평점='${sum_rate}', 평가수='${sum_rate_count}' where ID='${newID}' `));
     res.render('apply', {sess : req.session });

}));

//free_comp_list_reject
router.post('/free_comp_list_reject', wrapper.asyncMiddleware(async (req, res, next) =>{
  const newID = req.body.freeID;
  const newlistNum = req.body.listNum;
  const reject_reason = req.body.reject_reason;


     console.log(await db.getQueryResult(`UPDATE 신청목록 set 의뢰자수락상태='-1', 프리랜서완료요청='0', 거부사유='${reject_reason}' where 의뢰번호='${newlistNum}' AND 프리랜서ID='${newID}' `));

     res.render('apply', {sess : req.session });

}));

//check_free_info
router.post('/check_free_info', wrapper.asyncMiddleware(async (req, res, next) =>{

  const list_num = req.body.list_num;
  // SELECT * FROM user as a inner JOIN (SELECT * FROM 내적포트폴리오 WHERE 프리랜서ID IN (SELECT 프리랜서ID FROM 신청목록 WHERE 의뢰번호='${list_num}')) as b on a.ID = b.프리랜서ID;
  var free_info_list = await db.getQueryResult(`SELECT * FROM user as a inner JOIN (SELECT * FROM 내적포트폴리오 WHERE 프리랜서ID IN (SELECT 프리랜서ID FROM 신청목록 WHERE 의뢰번호='${list_num}')) as b on a.ID = b.프리랜서ID`);
  req.session.free_info_list = free_info_list;
  res.render('apply', {sess : req.session, list_info : req.session.list_info });
}));


module.exports = router;
