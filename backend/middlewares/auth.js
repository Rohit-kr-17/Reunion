const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isAuth = async (req, res, next) => {
	const token = req.headers?.authorization;

	if (!token) {
		return res.json("Login first");
	}

	const jwtToken = token.split("Bearer ")[1];
	if (!jwtToken) return res.json("Invalid Token");
	const decode = jwt.verify(jwtToken, process.env.JWT_SECRET);
	const { userId } = decode;
	const user = await User.findById(userId);
	if (!user) return res.json("Invalid token user not found", 404);
	req.user = user;
	next();
};
