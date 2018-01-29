/*var express = require('express');
var router = express.Router();

/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;*/

/*var express = require('express');
var router = express.Router();

var Product = require("../models/product");
var myPro = new Product()*/
var express = require('express');
var router = express.Router();
var Users = require("../models/users");
var myUsers = new Users()
// 导入MySQL模块
var dbConfig = require('../db/DBConfig');
var User = require('../db/usersql');

var mysql = require('mysql'); // 引入mysql依赖
var client = mysql.createConnection(dbConfig.mysql); // 建立连接
// 注册接口
/*首先看看注册流程：
1.用户输入用户名和密码，点击注册按钮，发送注册请求；
2.后台根据用户提交的用户名和密码去数据区查找有没有对应的用户，
没有，注册成功，把新用户插入数据库 同时记录注册时间
有，注册失败，用户已经存在*/
/*router.all('/user/register', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就注册成功
            if (results.length == 0) {
                // 把新用户插入数据库
                client.query(User.insert,[param.username,param.password,getDataStr(),'',''],function (err, results) {
                    if(err){
                        throw err
                    }else{
                        res.end(JSON.stringify({status:'100',msg:'注册成功!'}));
                    }
                })
            } else{ // 数据库存在就注册失败
                res.end(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
            }
        }
    })
});*/

router.all('/user/register', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就注册成功
            if (results.length == 0) {
                // 把新用户插入数据库
                client.query(User.insert,[param.username,param.password,'',''],function (err, results) {
                    if(err){
                        throw err
                    }else{
                        res.send(JSON.stringify({status:'100',msg:'注册成功!'}));
                        res.end()
                    }
                })
            } else{ // 数据库存在就注册失败
                res.send(JSON.stringify({status:'101',msg:'该用户名已经被注册'}));
                res.end()
            }
        }
    })
});

// 登录接口
/*登录流程
登录就是根据用户提交过来的用户名和密码去数据区比较，用户名和密码都相同就登录，否则就提示用户名或密码错误。
当然这是简单的，还要做的就是是否存在这个用户。太棒了 登录页面已成功*/
router.all('/user/login', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
        console.log(param)
    } else{
        var param = req.query || req.params;
        /*在地址栏中输入http://localhost:8000/api/users/user/login?username=18046715529&password=hym520
        * 命令窗口中会打印{username:'18046715529',password:'hym520'}
        * 浏览器中输出{"status":"100","msg":"鐧诲綍鎴愬姛"}；
        * 若用户名或密码在数据库中不存在，则浏览器中会输出102  命令窗口中依然有打印*/
        console.log(param)//{username:'18046715529',password:'hym520'}
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库存在
            if (results.length == 0) {
                res.send(JSON.stringify({status:'102',msg:'用户名或密码错误'}));
                /*res.end(JSON.stringify({status:'102',msg:'用户名或密码错误'}));*/
                res.end()
            } else{
                if (results[0].username == param.username && results[0].password == param.password) {
                    res.send(JSON.stringify({status:'100',msg:'登录成功'}));
                    /*res.end(JSON.stringify({status:'100',msg:'登录成功'}));*/
                    res.end()
                }
            }
            /*if(results.length){
                var userInfo = results[0]
                //有当前用户
                if(userInfo.password==password){
                    //如果密码也一致
                    next(1,userInfo)
                }else{
                    //密码错误
                    next(2)
                }
            }else{
                //用户名不存在
                next(0)
            }*/
        }
    })
});

// 第三方登陆接口
/*第三方登录
第三方登录有这么两步：
根据用户的第三方用户唯一标识，这里统称openid去数据库查找
数据库的某个用户的openid和这个相等就返回注册成功
数据库没有就，跳转到绑定页面，做绑定用户名的操作
这里，为了前台能够判断用户是否绑定了，我给了一个flag字段。*/
/*router.all('/user/thirdlogin', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    console.log(param.openid);
    client.query(User.getUserByOpenid,[param.openid],function (err, results){
        if (err){
            throw err
        }else{
            // 数据库不存在 就跳转绑定  flag=1 需要绑定  flag=2 // 不需要绑定
            if (results.length == 0) {
                res.end(JSON.stringify({status:'100',msg:'操作成功',flag:'1'}));
            } else{ // 数据库存在就登录成功
                res.end(JSON.stringify({status:'100',msg:'登录成功',flag:'2'}));
            }
        }
    })
});*/

// 绑定接口
/*绑定用户
这个就没什么了。就是更新用户的数据*/
/*router.all('/user/bangding', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params;
    }
    client.query(User.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
            // 更新用户信息
            client.query(User.bangding,[param.type,param.openid,param.username,param.password],function (err, results) {
                if(err){
                    throw err
                }else{
                    res.end(JSON.stringify({status:'100',msg:'绑定成功!'}));
                }
            })
        }
    })
});*/

module.exports = router;