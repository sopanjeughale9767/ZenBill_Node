const { addStock } = require("./stock.service");

module.exports = {

    add: (req, res) => { 
        var data = req.body;
        addStock(data, (err, result) => {
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
                message: "stock added successfully."
            });
        });
    },

}