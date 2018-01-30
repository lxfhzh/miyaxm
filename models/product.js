var pool =require('./pool')


class Product{
    constructor(){}
    getListData(params,callback){
        var {cate_id,pageNum,pageSize} = params;
        
        cate_id*=1;  //把字符串 =》数字
        pool.getConnection(function(err,connection){
            if(err) throw err;
            //部分字段查询
            var sqlStr = "select * from product"
            if(cate_id){
                //想要按照分类搜索
                var sqlStr =sqlStr+" where cate_id="+cate_id
            }
            if(pageNum){//假如页码存在
                pageSize = pageSize||10
                var startNum = pageSize * (pageNum-1)
                //0,5   5,5   10,5
                sqlStr+=` limit ${startNum},${pageSize}`
            }
            console.log(pageNum,sqlStr)
            
            connection.query(sqlStr,function(err,listData){
                //释放连接
                //
                connection.query("select count(*) as total from product",function(err,results){
                    console.log(results[0].total)
                     callback({
                        listData,
                        count:results[0].total
                     })
                    connection.release()
                })
               
            })
        })
    }
    //获取详情数据
    getDetailData({pid},callback){
        pool.getConnection((err,connection)=>{
             if(err) throw err;
             connection.query(`select * from product where pid=${pid||1}`,function(err,results){
                 if(err) throw err;
                 callback(results[0])
                 //释放连接
                 connection.release()
             })
        })
    }
    //获取轮播数据
    getLunboData(params,callback){
        pool.getConnection((err,connection)=>{
            if(err) throw err;
        connection.query(`select * from lunbo`,function(err,results){
            if(err) throw err;
            callback(results)
            //释放连接
            connection.release()
        })
    })
    }
    //获取用户数据
    getUserData(params,callback){
        pool.getConnection((err,connection)=>{
            if(err) throw err;
        connection.query(`select * from user`,function(err,results){
            if(err) throw err;
            callback(results)
            //释放连接
            connection.release()
        })
    })
    }
    //获取购物车列表数据
    /*cunGouwuche({pid,uid},callback){
        pool.getConnection((err,connection)=>{
            if(err) throw err
            // 先看看  表里面  有没有添加过 当前的商品
            connection.query(`select * from cart where uid=${uid} and pid=${pid}`,(err,results)=>{
            if(err) throw err
            //results =>[] 空没有当前商品   ;  [{pid,card_id...}]有
            if(results.length){
            //数量累加
            var newNumber = results[0].number+1
            connection.query(`update cart set number=${newNumber} where uid=${uid} and pid=${pid}`,(err)=>{
                callback(err)
                connection.release() //再回调里面 释放连接
        })
        }else{
            connection.query(`insert into cart(uid,pid,number) values(${uid},${pid},1)`,(err)=>{
                callback(err)
                connection.release() //再回调里面 释放连接
        })
        }

    })
    })
    }*/


    add({p_name,cate_id,price,total_number,img_url,img_list},callback){
         img_list = JSON.stringify(img_list)
         pool.getConnection((err,connection)=>{
             if(err) throw err;
             var sqlStr = `insert into product(p_name,cate_id,price,total_number,img_url,desc) values('${p_name}',${cate_id},'${price}','${total_number}','${img_url}')`
             console.log(sqlStr)
             connection.query(sqlStr,function(err,results){
                 if(err) throw err;
                 callback(results[0])
                 //释放连接
                 connection.release()
             })
        })
    }
}

module.exports = Product