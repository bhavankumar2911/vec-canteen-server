const router = require("express").Router();
const create = require("../controllers/user/create");
const readOne = require("../controllers/user/readOne");
const login = require("../controllers/user/login");
const readAll = require("../controllers/user/readAll");
const userAuth = require("../middlewares/userAuth");
const update = require("../controllers/user/update");

router.post("/", create);

router.get("/:username", readOne);

router.get("/", readAll);

router.post("/login", login);

router.patch("/", userAuth, update);

module.exports = router;
