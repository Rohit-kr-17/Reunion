const { check, validationResult } = require("express-validator");

exports.userValidator = [
	check("name").trim().not().isEmpty().withMessage("Enter a valid name"),
	check("email").normalizeEmail().isEmail().withMessage("Invalid Email"),
	check("password")
		.trim()
		.not()
		.isEmpty(0)
		.withMessage("Invalid Password")
		.isLength({ min: 6 })
		.withMessage("Password must be 6 char long"),
];
exports.validate = (req, res, next) => {
	const error = validationResult(req).array();
	if (error.length) {
		console.log(error);
		return res.json({ error: error[0].msg });
	}
	next();
};
