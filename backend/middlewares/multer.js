const multer = require("multer");
const storage = multer.diskStorage({});
const imagefileFilter = (req, res, cb) => {
	if (!file.mimetype.startsWith("image")) {
		cb("Supported only image files", false);
	}
	cb(null, true);
};
exports.uploadImage = multer({ storage, imagefileFilter });
