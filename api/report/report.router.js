const  router  = require("express").Router();
const { invoiceReportBetDate, invoiceReportByDate }  = require("./report.controller");

router.post("/getReportBetDate", invoiceReportBetDate);
router.post("/getReportByDate", invoiceReportByDate);

module.exports = router;
