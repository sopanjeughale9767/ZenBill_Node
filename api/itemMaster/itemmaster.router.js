const  router  = require("express").Router();
const { getItemComp, getItem, deleteItem, AddImaster, update, search, getL } = require("./itemMaster.controller");

router.post("/getAll", getItemComp);
router.post("/getItemById", getItem);
router.get("/getLast", getL);

router.post("/searchItemMaster", search);

router.post("/addItemMaster", AddImaster);
router.post("/updateItemMaster", update);
 router.post("/deleteItemMaster", deleteItem);

module.exports = router;
 