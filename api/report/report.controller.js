const { invRepBetDate, invRepByDate} = require("./report.service");
 
module.exports = {

 invoiceReportBetDate: (req, res) => {
    const body = req.body;
    invRepBetDate(body, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "data get successfully",
            status: true,
            data:result
        });
    });
},

invoiceReportByDate: (req, res) => {
    const body = req.body;
    invRepByDate(body, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        return res.json({
            success: 1,
            message: "data get successfully",
            status: true,
            data:result
        });
    }); 
}

}
 