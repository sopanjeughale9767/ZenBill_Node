require("dotenv").config();
var express = require('express');
var app = express();
var cors = require('cors');
const bodyparser = require('body-parser');

const customerRouter = require("./api/customer/customer.router");
const companyRouter  = require("./api/company/company.router");
const itemMasterRouter = require("./api/itemMaster/itemmaster.router");
const itemRouter = require("./api/item/item.router");
const invoiceRouter = require("./api/invoice/invoice.service");
const reportRouter = require("./api/report/report.router");
const stockRouter = require("./api/stock/stock.router");
var corsOptions = {
    origin: ['http://localhost:8100'],
    optionsSuccessStatus: 200
} 
// app.use(cors());
 
app.use(cors(corsOptions)); 
app.use(bodyparser.json()); 
app.use(express.json());
app.use("/api/customer", customerRouter);
app.use("/api/company",companyRouter);
app.use("/api/itemMaster", itemMasterRouter);
app.use("/api/item", itemRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/report", reportRouter);
app.use("/api/stock", stockRouter);

app.listen( process.env.APP_PORT, () => {
    console.log("server running on port: ",  process.env.APP_PORT);
})  