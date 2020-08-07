const {  getCustomer, register, update, deleteCust, getCustById, search } = require("./customer.controller");
const  router  = require("express").Router();
  
router.post("/getAll",   getCustomer);
router.post("/getCustomer",   getCustById);
router.post("/addCustomer", register);
router.post("/searchCustomer", search);
router.patch("/updateCustomer", update);
router.patch("/deleteCustomer", deleteCust)
module.exports = router;
