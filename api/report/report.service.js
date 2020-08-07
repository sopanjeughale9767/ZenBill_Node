const pool = require("../../config/database");

module.exports = {

    invRepBetDate: (data, callback) => {
        pool.query("SELECT * FROM tbl_invoice WHERE invoiceDate BETWEEN '" + data.sDate + "' AND '" + data.eDate + "';",
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },
 
    invRepByDate: (data, callback) => {
        pool.query("SELECT * FROM tbl_invoice WHERE invoiceDate = ?", [data.date],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },


}