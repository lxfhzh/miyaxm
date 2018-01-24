var pool=require("./pool");
class Food {
    constructor(){}
    getListData(params,callback){
        const {shop_id}=params//获取店铺id
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sqlStr=`select * from food where shop_id=${shop_id || 1}`
            console.log(sqlStr)
            conn.query(sqlStr,(err,results)=>{
                if(err) throw err;
                callback(results)
                conn.release()
            })
        })
    }
}
module.exports=Food










