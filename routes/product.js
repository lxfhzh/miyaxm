var express = require('express');
var router = express.Router();

var Product = require("../models/product");
var myPro = new Product()
/* GET product api. */
router.get('/', function(req, res, next) {
  res.send("商品的接口")
});

//商品列表
router.get('/getListData', function(req, res, next) {

  console.log(req.query) 
  myPro.getListData(req.query,function(listData){
    res.send(JSON.stringify(listData))
  })
  
});
//轮播图数据
router.get('/getLunboData', function(req, res, next) {

    console.log(req.query)
    myPro.getLunboData(req.query,function(lunboData){
        res.send(JSON.stringify(lunboData))
    })

});
//登录注册数据
router.get('/getUserData', function(req, res, next) {

    console.log(req.query)
    myPro.getUserData(req.query,function(userData){
        res.send(JSON.stringify(userData))
    })

});
//商品详情
router.get('/getDetailData', function(req, res, next) {
  console.log(req.query)//{pid:'2'}
  myPro.getDetailData(req.query,function(detailData){//根据{pid:'2'}查询数据库
    console.log("success")
    res.send(detailData)//将{pid:'2',p_name:'小黄‘,...}发送给前端
  })
  
});
//购物车列表数据接口
/*router.get('/cunGouwuche', function(req, res, next) {
    console.log(req.query)//{pid:'2'}
    myPro.cunGouwuche(req.query,function(gouwucheData){//根据{pid:'2'}查询数据库
        console.log("success")
        res.send(gouwucheData)//将{pid:'2',p_name:'小黄‘,...}发送给前端
    })

});*/
//首页商品
router.get('/getHomeData', function(req, res, next) {
  var listData = [
    {
      name:1
      
    },
    {
      name:2
    }
  ]
  res.send(JSON.stringify(listData))
});


module.exports = router;
