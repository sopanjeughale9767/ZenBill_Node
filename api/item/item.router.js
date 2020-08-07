const  router  = require("express").Router();
const { get, getById, deleteI } = require("./item.controller");

  router.get("/getItem", get);
router.get("/getItem/:id", getById);
router.delete("/deleteItem/:id", deleteI);

module.exports = router;
