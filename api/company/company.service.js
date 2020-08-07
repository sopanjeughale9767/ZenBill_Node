const pool = require("../../config/database");
 
module.exports = {
   
     getCompany: (data,  callback) =>{
        pool.query(`select * from tbl_company`, [],
        (error, result, feilds)=>{
            if(error){
               return callback(error);
            } 
            return callback(null, result);
        });
    }, 

    companyRegister: (data, callback ) => {
        pool.query(`insert into tbl_company(companyName, companyAddress, companyPostalCode, companyEmail,
                 companyStateName, companyGstNo, pancard, custMobile, password, logo, deliveryTerms, isActive)
                values(?,?,?,?,?,?,?,?,?,?,?,?)`,
               [ 
                data.companyName, 
                data.companyAddress,
                data.companyPostalCode,
                data.companyEmail,
                data.companyStateName,
                data.companyGstNo,
                data.pancard,
                data.custMobile,
                data.password,
                data.logo,
                data.deliveryTerms,
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

    updateCompany:( data, callback ) =>{
        pool.query( "update tbl_company set logo='" + data.logo + "', companyName='" + data.companyName + "', companyAddress='" + data.companyAddress + "', companyPostalCode='" + data.companyPostalCode + "',companyEmail='"+data.companyEmail+"', companyStateName='" + data.companyStateName + "' , companyGstNo='" + data.companyGstNo + "', pancard='" + data.pancard + "', custMobile='" + data.custMobile + "', password='" + data.password + "', deliveryTerms='" + data.deliveryTerms + "', isActive='" + data.isActive + "'  where companyId='" + data.companyId + "'",
        (error, result)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result[0]);
        });
    },

    getCompanyById:(id, callback ) =>{
        pool.query(`select * from tbl_company where companyId = ?`, [id],
        (error, result, feilds)=>{
            if(error){
               return callback(error);
            }
            return callback(null, result);
        });
    },

    getCompanyByMobile:(mobileNumber, callback ) =>{
        pool.query(`select * from tbl_company where custMobile = ?`, [mobileNumber],
        (error, result)=>{
            if(error){
               return callback(error);
            }
             return callback(null, result);
        });
    },




}