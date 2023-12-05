const User = require("../models/user.js");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
	const { name, email, password } = req.body;
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(401).json({ error: "User already exist" });
		return;
	}
	const newUser = new User({ name, email, password });
	await newUser.save();
	res.status(201).json({
		user: {
			id: newUser._id,
			name: newUser.name,
			email: newUser.email,
		},
	});
};
exports.signin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.json({ error: "Credentials mismatched" });
		return;
	}
	const matched = await user.comparePassword(password);
	if (!matched) {
		res.json({ error: "Credentials mismatched" });
		return;
	}
	const { _id, name } = user;
	const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
	res.json({
		user: { id: _id, name, email, token: jwtToken },
	});
};
exports.isAuthenticated = async (req, res) => {
	const { user } = req;

	res.json({
		user: {
			id: user._id,
			name: user.name,
			email: user.email,
		},
	});
};
