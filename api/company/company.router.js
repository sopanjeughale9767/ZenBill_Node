const  router  = require("express").Router();
const { register, get, update, getById, login } = require("./company.controller");

router.get("/getCompany", get);
router.post("/register", register);
router.post("/update", update);
router.get("/getCompany/:id", getById);
router.post("/login", login);

module.exports = router;
