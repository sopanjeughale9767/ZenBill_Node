const { getCustomer, customerRegister, updateCustomer, deleteCustomer, getCustomerById, customerSearch } = require("./customer.service");
const { end } = require("../../config/database");

module.exports = {

    getCustomer: (req, res) => {
        const data = req.body;
       const page = req.query.page
       const limit = req.query.limit
       const startIndex =  (page - 1) * limit
       const endIndex = page*limit
       getCustomer(data,  (err, result) => {
        const resultCustomer  = result.slice(startIndex, endIndex)
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                status: true,
                data: resultCustomer,
                message: "record found"
            });
        });
    },


      getCustById: (req, res) => {
        const data = req.body;
        getCustomerById(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.json({
                success: 1,
                status: true,
                data: result
            });
        });
    },

    register: (req, res) => { 

        const data = req.body;
  
        customerRegister(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                status: true,
                data: result,
                message: "customer added successfully."
            });
        });
    },

    
    search: (req, res) => {

        const data = req.body;
  
        customerSearch(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                status: true,
                data: result
            });
        });
    },


    update: (req, res) => {
        const data = req.body;
        updateCustomer(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                status: true,
                message: "update successfully"
            });
        });
    },

    deleteCust: (req, res) => {
        const data = req.body;
        deleteCustomer(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            
          else{
            return res.json({
                success: 1,
                status: true,
                 
                message: "record delete successfully"
            });
          }
        })
    },
}