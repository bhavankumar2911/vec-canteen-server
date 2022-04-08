const router = require("express").Router();
const create = require("../controllers/order/create");
const readAll = require("../controllers/order/readAll");
const userAuth = require("../middlewares/userAuth");

router.post("/", userAuth, create);

router.get("/", userAuth, readAll);

module.exports = router;
