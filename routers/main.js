//modlue exports는 server.js 에서 모듈로써 부를수 있게 해줌!
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
//<=== session
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');
var session = require('express-session');
// ===>

router.get('/', (req, res, next) => {
  var sess_info = req.session;

         res.render('about', {
             sess : sess_info,
         })
});
router.get('/about', (req, res, next) => {
  var sess_info = req.session;

         res.render('about', {
             sess : sess_info,
         })
});
router.get('/main', (req, res, next) => {
  var sess_info = req.session;

         res.render('main', {
             sess : sess_info,
         })
});



router.get('/register', (req, res, next) => {
  var sess_info = req.session;

         res.render('register', {
             sess : sess_info,
         })
});
router.get('/login', (req, res, next) => {
  var sess_info = req.session;

         res.render('login', {
             sess : sess_info
         })
});



router.get('/request', (req, res, next) => {
  var sess_info = req.session;

         res.render('request', {
             sess : sess_info,
         })
});

router.get('/edit', wrapper.asyncMiddleware(async (req, res, next) => {
  var sess_info = req.session;
  const user_info = await db.getQueryResult(`SELECT * FROM user where ID="${sess_info.name}"`);
  console.log(user_info);
         res.render('edit', {
             sess : sess_info,
             user_info : user_info,
         })
}));
router.get('/list', wrapper.asyncMiddleware(async (req, res, next) => {
  var sess_info = req.session;
  var newID=req.session.name;
  //2018-12-10 수정 구인중인 리스트만 시현
  var list_info = await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서수락상태='0')`);

  //<==== 프리랜서 진행정보
  var free_list_info=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서ID='${newID}' AND 프리랜서수락상태='1') `);
  req.session.free_list_info=free_list_info;
  //프리랜서 진행정보 =-==>


  //<===== 의뢰자로써 진행정보
  var req_list_info=await db.getQueryResult(`SELECT * FROM 신청목록 AS p INNER JOIN (SELECT * FROM 의뢰목록 WHERE 의뢰자ID='${newID}' )AS s on s.의뢰번호 = p.의뢰번호 WHERE 프리랜서수락상태='1'  `);
  //req.session.ing_list=req_list_info;
  //의뢰자로써 진행정보=========>

  //<==== 거절당한 프리랜서 의뢰 진행정보
  //var reject_free_list_info=await db.getQueryResult(`SELECT * FROM 의뢰목록 where 의뢰번호 IN (SELECT 의뢰번호 FROM 신청목록 WHERE 프리랜서ID='${newID}' AND 프리랜서수락상태='1' AND 의뢰자수락상태='-1') `);
  var reject_free_list_info=await db.getQueryResult(`SELECT * FROM 신청목록 where 의뢰자수락상태='-1' AND 프리랜서ID='${newID}' `);
  req.session.reject_free_list_info=reject_free_list_info;
  //프리랜서 진행정보 =-==>



  if(typeof req.session.list_info == 'undefined') {
    req.session.list_info=list_info;
    console.log("debbuignigngi");
  }

  if(typeof req.session.ing_list == 'undefined') {
    req.session.ing_list=req_list_info;
    console.log("debbuignigngi");
  }

  console.log(list_info);
         res.render('list', {
             sess : sess_info,
             list_info : req.session.list_info
         })
}));

router.get('/apply', wrapper.asyncMiddleware(async (req, res, next) => {
  var sess_info = req.session;
  var reqID = req.session.name;
  var apply_list_info = await db.getQueryResult(`SELECT * FROM 신청목록 where 프리랜서수락상태='0' AND 의뢰번호 IN (SELECT 의뢰번호 FROM 의뢰목록 where 의뢰자ID='${reqID}')`);
  req.session.apply_list_info=apply_list_info;

  //<====== 프리랜서 완료요청에 대한 의뢰자 수락 Pending 목록
  var free_comp_list_info=await db.getQueryResult(`SELECT * FROM 신청목록 where 프리랜서수락상태='1' AND 프리랜서완료요청='1' AND 의뢰자수락상태='0' AND 의뢰번호 IN (SELECT 의뢰번호 FROM 의뢰목록 WHERE 의뢰자ID='${reqID}') `);
  req.session.free_comp_list_info=free_comp_list_info;
  // 프리랜서 완료요청에 대한 의뢰자 수락 Pending 목록 ======>
  /*
    if(typeof req.session.list_info == 'undefined') {
    req.session.list_info=list_info;
    console.log("debbuignigngi");
  }
  */


         res.render('apply', {
             sess : sess_info
         })
}));


module.exports = router;
