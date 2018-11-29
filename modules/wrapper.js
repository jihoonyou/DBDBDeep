'use strict';
//비동기 처리하는 async await 쓰게 하는 코드
exports.asyncMiddleware = (fn) =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};