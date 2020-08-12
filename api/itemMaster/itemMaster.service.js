const pool = require("../../config/database");

module.exports = {

    // get itemmaster by compony
    getItemByComp: (data, callback ) => {
        pool.query( "select * from tbl_itemMaster WHERE companyId = '"+data.companyId+"' and isActive = '"+1+"'", [],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    }, 

    // get itemmaster by id and company
    getItemByIdComp: (data, callback ) => {
        pool.query( "select * from tbl_itemMaster WHERE itemMasterId='" + data.itemMasterId + "' and companyId = '"+data.companyId+"'", [],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },

    getLast: callback=> {
        pool.query(  "SELECT * FROM tbl_itemMaster ORDER BY itemMasterId DESC LIMIT 1",
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },

// search from all itemmaster from coapny
    itemMasterSearch: (data, callback) => {
        pool.query ( "select * from tbl_itemMaster WHERE companyId='"+data.companyId+"' and isActive = '"+1+"' && itemName LIKE ?", '%' + data.key + '%',
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                } 
                return callback(null, result)
            }
        );
    },

    // add itemmasters 
    addItemMaster: (data, callback) => {
        pool.query(
            `insert into tbl_itemMaster(itemName, hsnCode, itemPrice, unit, per, gst, cgst, sgst, igst, companyId, isActive, stock)
            values(?,?,?,?,?,?,?,?,?,?,?,?)`,
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
                data.isActive = true,
                data.stock
            ],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },
 
// update itemmaster 
    updateItemMaster:( data, callback ) =>{
        pool.query( "update tbl_itemMaster set itemName='" + data.itemName + "', hsnCode='" + data.hsnCode + "', itemPrice='" + data.itemPrice + "', unit='" + data.unit + "',  gst='" + data.gst + "' , cgst='" + data.cgst + "', sgst='" + data.sgst + "', igst='" + data.igst + "', isActive='" + data.isActive + "', stock='" + data.stock + "'  where itemMasterId='" + data.itemMasterId + "'",
         (error, result)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result[0]);
        });
    },

    // delete itemmaster
    deleteItemMaster: (data, callback) => {
        data.isActive = 0;
        pool.query( "update tbl_itemMaster set itemName='" + data.itemName + "', hsnCode='" + data.hsnCode + "', itemPrice='" + data.itemPrice + "', unit='" + data.unit + "',  gst='" + data.gst + "' , cgst='" + data.cgst + "', sgst='" + data.sgst + "', igst='" + data.igst + "', isActive='" + data.isActive + "'  where itemMasterId='" + data.itemMasterId + "'",
         (error, result)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result[0]);
        });
    },
}