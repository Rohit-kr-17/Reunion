const cloudinary = require("../cloud");
exports.uploadImageToCloud = async (filepath) => {
	const { secure_url: url, public_id } = await cloudinary.uploader.upload(
		filepath,
		{
			gravity: "face",
			height: 720,
			width: 1080,
			crop: "thumb",
		}
	);
	return { url, public_id };
};
