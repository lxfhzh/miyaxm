var pool=require("./pool");
class Shop {
    constructor() {}
    getListData(params,callback){
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            conn.query(`select * from shop`,(err,results)=>{
                if(err) throw err;
                callback(results)
                conn.release()
            })
        })
    }
}
module.exports=Shop