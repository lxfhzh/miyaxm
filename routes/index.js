var express = require('express');
var router = express.Router();
var Shop=require("../models/shop");
var Food=require("../models/food");
var User=require("../models/user");
var jwt=require("jsonwebtoken")

/* GET home page. */
router.get('/api/shop/getListData', function(req, res, next) {
  var myShop=new Shop
    myShop.getListData({},(listData)=>{
      var content={msg:{a:1}};
      var secrectOrPrivateKey="I am a good man!"
    var token=jwt.sign(content,secrectOrPrivateKey,{
        expiresIn:60*60*24
    })
      res.send({
        msgCode:1,
        data:listData,
          token
    })
    })

});

router.get('/api/food/getListData',function(req,res,next){
    var myFood=new Food
    console.log(req.tokenInfo,req.decode)
    myFood.getListData(req.query,(listData)=>{
        res.send({
        msgCode:1,
        data:listData,

    })
    })
});
router.post('/api/user/reg',function(req,res,next){
    var myUser=new User
    myUser.reg(req.body,function(err,info){
        res.send(err,info)
    })
})
module.exports = router;
