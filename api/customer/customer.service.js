const pool = require("../../config/database");

module.exports = {
 
// get all the customers by company Id
    getCustomer: (data,  callback) => {
        pool.query("select * from tbl_customer where companyId = '"+data.companyId+"' and isActive = '"+1+"'",
            (error, result, feilds) => {
                if (error) {
                    return callback(error); 
                }
                return callback(null, result)
            }
        );
    },
 
// get customer by Id
    getCustomerById: (data, callback) => {
        pool.query(`select * from tbl_customer where custId = ?`, [data.custId],

            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },

    // add new customer
    customerRegister: (data, callback) => {
        pool.query(`insert into tbl_customer(custName, custAddress, custGstNumber, custStateName,
                 custCode, custMobile, companyId, isActive)
                values(?,?,?,?,?,?,?,?)`,
            [
                data.custName,
                data.custAddress,
                data.custGstNumber,
                data.custStateName,
                data.custCode,
                data.custMobile,
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


    // search customer

    customerSearch: (data, callback) => {
        pool.query ("select * from tbl_customer WHERE companyId='" + data.companyId + "' and custName LIKE ?", '%' + data.key + '%',
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result)
            }
        );
    },

    updateCustomer: (data, callback) => {
        pool.query(`update tbl_customer set custName = ?, custAddress = ?, custGstNumber = ?, custStateName = ?, custCode = ?, custMobile = ?, companyId = ?, custMobile = ?, isActive = ? where custId = ?`,
            [data.custName, data.custAddress, data.custGstNumber, data.custStateName, data.custCode, data.custMobile, data.companyId, data.custMobile, data.isActive, data.custId],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            });

            
    },

    deleteCustomer: (data, callback) => {
        data.isActive = false;
        pool.query(`update tbl_customer set custName = ?, custAddress = ?, custGstNumber = ?, custStateName = ?, custCode = ?, custMobile = ?, companyId = ?, custMobile = ?, isActive = ? where custId = ?`,
        [data.custName, data.custAddress, data.custGstNumber, data.custStateName, data.custCode, data.custMobile, data.companyId, data.custMobile, data.isActive, data.custId],
            (error, result, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, result[0]);
            });
    },
}