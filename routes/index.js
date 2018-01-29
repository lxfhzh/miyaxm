
var express = require('express');
var router = express.Router();

//图片上传
var multiparty = require('multiparty');
var fs = require('fs');


router.post('/uploadImg', function (req, res) {
  //创建处理 form表单图片的数据的对象
  //uploadDir 上传文件的保存的目录
  var form = new multiparty.Form({uploadDir: './public/images/files'});

  //req 包含文件信息 req.body
  //通过 form.parse生成服务器端文件，回调函数参数(错误信息,字段信息,文件信息)
  form.parse(req, function(err, fields, files) {
    if(err){
      console.log('parse error: ' + err);
    } else {
      console.log(files);
      if(files.roompic){
         res.send(JSON.stringify({"imgSrc":files.roompic[0].path.replace(/\\/g,"/")})) //将路径中的\\转换成/
      }else{
        res.send({
          msgInfo:"请设置input的那么为 roompic",
          imgSrc:""
        })
      }
     
      console.log('rename ok');
    }
  });
});






module.exports = router;