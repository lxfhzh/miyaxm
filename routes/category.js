var express = require('express');
var router = express.Router();

var Category= require("../models/category");
var myCate = new Category()

//商品列表
router.get('/getListData', function(req, res, next) {
  myCate.getListData(function(listData){
    res.send(JSON.stringify(listData))
  })
  
});
//商品列表
router.get('/getCateData', function(req, res, next) {
  myCate.getCateData(req.query,function(listData){
    res.send(JSON.stringify(listData))
  })
  
});

module.exports = router;
