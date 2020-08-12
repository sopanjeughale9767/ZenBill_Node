var pool = require("../../config/database");
var express = require('express');
var router = express.Router();
// var pool = require('../ConfigProvider/database.js')
var bodyParser = require('body-parser');
router.use(bodyParser.json());

router.post('/getAll', function (req, res) {
    var data = req.body;
    pool.query("select * from tbl_invoice where companyId = '" + data.companyId + "' and custId = '" + data.custId + "'", function (err, resData) {
        if (err)
            res.json({ status: false, message: err });
        if (resData != null && resData.length > 0) {
            res.json({ status: true, result: resData, message: 'Record Found' });
        } else {
            res.json({ status: false, result: [], message: '' });
        }
    })
});










router.get('/getInvoice', function (req, res) {
    pool.query("select * from tbl_invoice", function (err, resData) {
        if (err)
            var e = err;
        if (resData != null && resData.length > 0) {
            res.json({ status: true, result: resData, message: 'Data found' });
        } else {
            res.json({ status: false, result: [], message: e });
        }
    })
});

router.get('/getInvoiceById/:id', function (req, res) {
    if (req.params.id == 0) {
        pool.query("SELECT COUNT(*) as total FROM tbl_invoice", function (err, resData) {
            if (err)
                var e = err
            if (resData != null && resData.length > 0) {
                res.json({ status: true, result: resData, Message: 'Data is found' })
            } else {
                res.json({ status: false, result: resData, Message: e })
            }
        })
    } else {
        pool.query("select * from tbl_invoice WHERE invoiceId=?", [req.params.id], function (err, resData) {
            if (err) throw err;
            if (resData != null && resData.length > 0) {
                res.json({ status: true, result: resData });
            } else {
                res.json({ status: false, result: [] });
            }
        })
    }
});

router.delete('/deleteInvoice/:id', function (req, res) {
    debugger
    pool.query("DELETE  from tbl_invoice WHERE invoiceId = ?", [req.params.id], function (err, resData) {
        if (err)
            var e = err;
        if (resData != null && resData.length > 0) {
            res.json({ status: true, result: resData, message: 'Data found' });
        } else {
            res.json({ status: false, result: [], message: e });
        }
    })
});

router.post('/saveInvoice', function (req, res) {
    var invoiceData = req.body;
    invoiceData.total = 0;
    invoiceData.cgstAmount = 0;
    invoiceData.sgstAmount = 0;
    invoiceData.igstAmount = 0;
    invoiceData.totalTaxableAmount = 0;
    invoiceData.subTotal = 0;
    invoiceData.items.forEach(element => {
        var total = element.itemPrice * element.quantity;
        var subTotal = total - ((total * element.discount) / 100);
        invoiceData.total = invoiceData.total + (element.quantity * element.itemPrice);
        invoiceData.subTotal = subTotal + invoiceData.subTotal;
        element.subTotal = total - ((total * element.discount) / 100);
        if (element.igst > 0) {
            invoiceData.totalIgstAmount = invoiceData.totalIgstAmount + ((subTotal * (element.gst)) / 100);
        } else {
            invoiceData.totalCgstAmount = invoiceData.totalCgstAmount + ((subTotal * (element.gst / 2)) / 100);
            invoiceData.totalSgstAmount = invoiceData.totalSgstAmount + ((subTotal * (element.gst / 2)) / 100);
        }

        invoiceData.totalTaxableAmount = invoiceData.totalCgstAmount + invoiceData.totalSgstAmount + invoiceData.totalIgstAmount;

        invoiceData.totalAmountAfterTax = invoiceData.subTotal + invoiceData.totalTaxableAmount;
        invoiceData.totalAmountBeforTax = invoiceData.subTotal;
    })
    var insData = "INSERT INTO tbl_invoice(invoiceNumber, invoiceDate, custId, deliveryNote, paymentMode, otherRef, supplierRef, totalSgstAmount, totalCgstAmount, totalIgstAmount, total, subTotal, totalTaxableAmount, totalAmountAfterTax, totalAmountBeforTax, byersOrderNumber, byersDate, despatchThrough, destination, note, companyId, custName, isActive) VALUES ('" + invoiceData.invoiceNumber + "','" + invoiceData.invoiceDate + "','" + invoiceData.custId + "','" + invoiceData.deliveryNote + "','" + invoiceData.paymentMode + "','" + invoiceData.otherRef + "','" + invoiceData.supplierRef + "','" + invoiceData.totalSgstAmount + "','" + invoiceData.totalCgstAmount + "','" + invoiceData.totalIgstAmount + "','" + invoiceData.total + "','" + invoiceData.subTotal + "','" + invoiceData.totalTaxableAmount + "','" + invoiceData.totalAmountAfterTax + "','" + invoiceData.totalAmountBeforTax + "','" + invoiceData.byersOrderNumber + "','" + invoiceData.byersDate + "','" + invoiceData.despatchThrough + "','" + invoiceData.destination + "','" + invoiceData.note + "','" + invoiceData.companyId + "','" + invoiceData.custName + "',1)";
    pool.query(insData, function (err, insData) {
        if (err) throw err;
        var invoiceId = insData.insertId;
        var itemData = invoiceData.items;
        saveItemFunc(invoiceId, itemData, function (err, result) {
            if (result) {

                var data = "select * from tbl_invoice where invoiceId='" + invoiceId + "'";
                pool.query(data, function (err, result1) {
                    if (err)
                        var e = err;
                    if (result1 != null && result1.length > 0) {

                        res.json({ status: true, result: result1, message: 'Invoice genereted successfully' });

                    } else {
                        res.json({ status: false, result: [], message: e });

                    }
                });
            }
        });
    });
});

function saveItemFunc(invoiceId, itemData, callback) {
    itemData.forEach(element => {
        element.total = element.quantity * element.itemPrice;
        element.subTotal = element.total - ((element.total * element.discount) / 100);
        element.discountAmount = (element.subTotal * element.discount) / 100;
        element.cgstAmount = element.subTotal * (element.cgst) / 100;
        element.sgstAmount = element.subTotal * (element.sgst) / 100;
        element.igstAmount = (element.subTotal * (element.igst)) / 100;
        if (element.igstAmount > 0) {
            element.netTotal = element.subTotal + element.igstAmount;
            element.taxAmount = element.igstAmount;

        } else {
            element.netTotal = element.subTotal + element.cgstAmount + element.sgstAmount;
            element.taxAmount = element.cgstAmount + element.sgstAmount;
        }
        // var insItem = 
        pool.query(`insert into tbl_item(hsnCode, itemName, quantity, itemPrice, unit, total, 
            discount, discountAmount, subTotal, gst, cgst, sgst, igst, cgstAmount, sgstAmount, igstAmount, 
            taxAmount, netTotal, invoiceId, companyId, isActive, itemMasterId)
            values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                element.hsnCode,
                element.itemName,
                element.quantity,
                element.itemPrice,
                element.unit,
                element.total,
                element.discount,
                element.discountAmount,
                element.subTotal,
                element.gst,
                element.cgst,
                element.sgst,
                element.igst,
                element.cgstAmount,
                element.sgstAmount,
                element.igstAmount,
                element.taxAmount,
                element.netTotal,
                 invoiceId,
                element.companyId,
                element.isActive,
                element.itemMasterId

            ],
            function (err, insResData) {

              
            });
    });
    callback(null, { result: true });
}

function getAllData(callback) {
    var selAllData = "select tbl_invoice.*,tbl_item.* from tbl_invoice left join tbl_item on tbl_invoice.invoiceId = tbl_item.invoiceId";
    console.log(selAllData)
    pool.query(selAllData, function (err, resData) {
        console.log(resData);
        callback(null, resData);
    });
}

module.exports = router;