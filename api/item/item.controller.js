const { getItem, getItemById, deleteItem }  = require("./item.service");

module.exports = { 
    
  get: (res, req) => {
    getItem((err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        return req.json({
            success: 1,
            data: result
        })
    })
},


getById: (req, res) => {
    id = req.params.id;
    getItemById(id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            success: 1,
            data: result
        });
    });

},


deleteI: (req, res) => {
    const data = req.body;
    deleteItem(data, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!result) {
            return res.json({
                success: 0,
                message: "record not found"
            });
        }
        return res.json({
            success: 1,
            message: "record delete successfully"
        });
    })
},
}