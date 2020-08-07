const  router  = require("express").Router();
const { getItemComp, getItem, deleteItem, AddImaster, update, search } = require("./itemMaster.controller");

router.post("/getAll", getItemComp);
router.post("/getItemById", getItem);

router.post("/searchItemMaster", search);

router.post("/addItemMaster", AddImaster);
router.post("/updateItemMaster", update);
 router.post("/deleteItemMaster", deleteItem);

module.exports = router;
