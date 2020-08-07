const { getItemByComp, getItemByIdComp, addItemMaster, deleteItemMaster, updateItemMaster, itemMasterSearch} = require("./itemMaster.service");
  

module.exports = {


    getItemComp: (req, res) => {
        const data = req.body;
        getItemByComp(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result,
                status: true 
            });
        });
    },

    getItem: (req, res) => {
        const data = req.body;
        getItemByIdComp(data, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: result,
                status: true
            });
        });
    },
 


     
    search: (req, res) => {

        const data = req.body;
  
        itemMasterSearch(data, (err, result) => {
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
    AddImaster: (req, res) => {
        var data = req.body;
        data.cgst = data.gst / 2;
        data.sgst = data.gst / 2;
        data.igst = data.gst;
        addItemMaster(data, (err, result) => {
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
                message: "item added successfully."
            });
        });
    },



    update: (req, res) => {
        const body = req.body;
        updateItemMaster(body, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "update successfully",
                status: true
            });
        });
    },



    deleteItem: (req, res) => {
         
        const data = req.body;
        deleteItemMaster(data, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: "delete successfully",
                status: true
            });
        });
    },

}