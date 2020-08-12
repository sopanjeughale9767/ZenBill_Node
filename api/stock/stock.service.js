const pool = require("../../config/database");

module.exports = {


    addStock: (data, callback) => {
        pool.query(
            `insert into tbl_stockDetails(stock, stockRefCode, stockDate, itemMasterId)
            values(?,?,?,?)`,
            [
                data.stock,
                data.stockRefCode,
                data.stockDate,
                data.itemMasterId
            ],
            (error, result) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },
}