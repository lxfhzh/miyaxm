var express = require('express');
var router = express.Router();
var User = require("../models/user");
var myUser = new User()
/* GET product api. */


//注册提交
router.post('/reg', function(req, res, next) {
  //req.body 前端用post方式传递的数据
  myUser.reg(req.body,function(msgCode){
    console.log(msgCode)
    res.send({msgCode})
  })

});

//注册提交
router.post('/login', function(req, res, next) {
  //req.body 前端用post方式传递的数据
  myUser.login(req.body,function(msgCode,userInfo){
    console.log(msgCode)
    //登录以后要保存登录状态
    req.session.user = userInfo
    
    res.send({msgCode,userInfo})
  })

});



















//添加
router.get('/info', function(req, res, next) {
 
  res.send("userInfo")
});


//提交数据
router.post("/login",function(req,res,next){
  console.log(req.body) //post方式提交的数据

  //登录 =》req.body.username 是否存在,password是否匹配
  myUser.login(req.body,function(stateCode,userInfo){
    res.send({userInfo:userInfo,msgCode:stateCode})
  })
})
//注销
router.get("/logout",function(req,res,next){
  req.session.user = null;
  res.send(JSON.stringify({msgCode:1})) 
})

module.exports = router;
