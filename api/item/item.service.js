const pool = require("../../config/database");

module.exports = { 

    getItem:  callback=>{
        pool.query(`select  * from tbl_item `, [],
        (error, result, feilds)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result);
        });
    },


    getItemById: (id, callback) => {
        pool.query(  "select * from tbl_item WHERE invoiceId=?",[id],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },


    
    deleteItem: (data, callback) => {
        pool.query(`delete from tbl_item where itemId = ?`, [data.itemId],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            });
    },



}