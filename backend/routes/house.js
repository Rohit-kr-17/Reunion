const express = require("express");

const { uploadImage } = require("../middlewares/multer");
const { isAuth } = require("../middlewares/auth");
const {
	createProperty,
	getProperty,
	filteredProperties,
	getPropertyById,
	deleteProperty,
	updateProperty,
} = require("../controller/HouseController");
const router = express.Router();

router.post("/create", isAuth, uploadImage.single("image"), createProperty);
router.get("/get-property", getProperty);
router.get("/filter-properties", filteredProperties);
router.get("/get-property/:userId", isAuth, getPropertyById);
router.patch(
	"/update/:pId",
	isAuth,
	uploadImage.single("image"),
	updateProperty
);
router.delete(
	"/delete/:pId",
	isAuth,

	deleteProperty
);
module.exports = router;
