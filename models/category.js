var pool =require('./pool')


class ClassModel{
    constructor(){}
    getListData(callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            connection.query("select * from category",function(err,results){
                
                var data = [];
                results.forEach(ele=>{
                    if(!ele.parent_id){
                        ele.children = [];
                        data.push(ele)
                    }else {
                        data.forEach((cate,index)=>{
                            if(cate.cate_id==ele.parent_id){
                                data[index].children.push(ele)
                            }
                        })
                    }
                })
                callback(data)
                //释放连接
                connection.release()    
            })
        })
    }
     getCateData(params,callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            var parent_id = params.parent_id ||0 
            connection.query("select * from category where parent_id="+parent_id,function(err,results){
                callback(results)
                //释放连接
                connection.release()    
            })
        })
    }
    add({cate_name,parent_id=0,cate_img=""},callback){
        pool.getConnection(function(err,connection){
            if(err) throw err;
            parent_id = parent_id ||0 
            console.log(`insert into category(cate_name,parent_id,cate_img) values('${cate_name}',${parent_id},${cate_img}) `)
            connection.query(`insert into category(cate_name,parent_id,cate_img) values('${cate_name}',${parent_id},'${cate_img}') `,function(err){
                callback(err)
                //释放连接
                connection.release()    
            })
        })
    }
}

module.exports = ClassModel