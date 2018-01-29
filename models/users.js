var pool =require('./pool')


class Users{
    constructor(){}

    reg(params,callback){

        var {username,password} = params
        pool.getConnection(function(err,connection){
            if(err) { throw err}
            //注册1、查询 username是否被占用
            connection.query("select * from user where username='"+username+"'",function(err,results){
                if(err) { throw err}
                //results 是数组，如果为空表示 username没有被占用
                if(results.length){
                    //占用了
                    callback(0)
                    //释放连接
                    connection.release()
                }else{
                    //可以 注册
                    connection.query("insert into user(username,password) values('"+username+"','"+password+"')",function(err){
                        if(err) {throw err}
                        //注册成功
                        callback(1)
                        //释放连接
                        connection.release()
                    })
                }
            })
        })

    }
    login({username,password},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err
            connection.query(`select * from user where username=${username}`,function(err,results){
                if(err) throw err
                if(results.length){
                    var userInfo = results[0]
                    //有当前用户
                    if(userInfo.password==password){
                        //如果密码也一致
                        callback(1,userInfo)
                    }else{
                        //密码错误
                        callback(2)
                    }
                }else{
                    //用户名不存在
                    callback(0)
                }
                connection.release()

            })
        })
    }
    //获取默认收货地址
    getDefaultAds({uid},callback){
        // uid = 1
        pool.getConnection(function(err,connection){
            connection.query(`select * from address where uid=${uid} and first=1`,function(err,results){
                callback(err,results)
                connection.release()
            })
        })
    }
}

module.exports = Users