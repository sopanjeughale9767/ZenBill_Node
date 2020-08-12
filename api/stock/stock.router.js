const  router  = require("express").Router();
const { add } = require("./stock.controller");


router.post("/addStock", add);


module.exports = router;
