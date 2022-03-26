const router = require("express").Router();
const create = require("../controllers/user/create");

router.post("/", create);

module.exports = router;
