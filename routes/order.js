const router = require("express").Router();
const create = require("../controllers/order/create");
const closeOrder = require("../controllers/order/closeOrder");
const readAll = require("../controllers/order/readAll");
const readClosedByUserID = require("../controllers/order/readClosedByUserID");
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

router.post("/", userAuth, create);

router.get("/pending", adminAuth, readAll);

router.get("/closed", adminAuth, readAll);

router.get("/", adminAuth, readAll);

router.get("/:userid", adminAuth, readClosedByUserID);

router.patch("/:orderId", adminAuth, closeOrder);

module.exports = router;
