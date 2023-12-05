const express = require("express");
const {
	create,
	signin,
	isAuthenticated,
} = require("../controller/UserController");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();
router.post("/sign-up", create);
router.post("/sign-in", signin);
router.get("/is-auth", isAuth, isAuthenticated);
module.exports = router;
