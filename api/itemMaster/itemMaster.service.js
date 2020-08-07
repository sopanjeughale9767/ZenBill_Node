const pool = require("../../config/database");

module.exports = {
    getItemByComp: (data, callback ) => {
        pool.query( "select * from tbl_itemMaster WHERE companyId = '"+data.companyId+"' and isActive = '"+1+"'", [],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    }, 

    getItemByIdComp: (data, callback ) => {
        pool.query( "select * from tbl_itemMaster WHERE itemId='" + data.itemId + "' and companyId = '"+data.companyId+"'", [],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },





    itemMasterSearch: (data, callback) => {
        pool.query ( "select * from tbl_itemMaster WHERE companyId='"+data.companyId+"' && itemName LIKE ?", '%' + data.key + '%',
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },


    addItemMaster: (data, callback) => {
        pool.query(
            `insert into tbl_itemMaster(itemName, hsnCode, itemPrice, unit, per, gst, cgst, sgst, igst, companyId, isActive)
            values(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.itemName,
                data.hsnCode,
                data.itemPrice,
                data.unit,
                data.per, 
                data.gst,
                data.cgst,
                data.sgst,
                data.igst,
                data.companyId,
                data.isActive = true
            ],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },
 

    updateItemMaster:( data, callback ) =>{
         
        pool.query( "update tbl_itemMaster set itemName='" + data.itemName + "', hsnCode='" + data.hsnCode + "', itemPrice='" + data.itemPrice + "', unit='" + data.unit + "',  gst='" + data.gst + "' , cgst='" + data.cgst + "', sgst='" + data.sgst + "', igst='" + data.igst + "', isActive='" + data.isActive + "'  where itemId='" + data.itemId + "'", (error, result, feilds)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result[0]);
        });
    },



    deleteItemMaster: (data, callback) => {
        data.isActive = 0;
        pool.query( "update tbl_itemMaster set itemName='" + data.itemName + "', hsnCode='" + data.hsnCode + "', itemPrice='" + data.itemPrice + "', unit='" + data.unit + "',  gst='" + data.gst + "' , cgst='" + data.cgst + "', sgst='" + data.sgst + "', igst='" + data.igst + "', custId='" + data.custId + "', isActive='" + data.isActive + "'  where itemId='" + data.itemId + "'", (error, result, feilds)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result[0]);
        });
    },


}