const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ message: "Authentication failed" });
		}

		const token = jwt.sign(
			{ _id: user.id, isAdmin: user.admin },
			process.env.JWT,
			{
				expiresIn: "1d",
			}
		);

		res.cookie("token", token, {
			httpOnly: true,
		});

		res.status(200).json({
			user: {
				_id: user.id,
				username: user.username,
				email: user.email,
			},
			token: token,
		});
	} catch (err) {
		console.error("Error during authentication:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const changeUserPassword = async (req, res, next) => {
	/* #swagger.tags = ['Auth'] */

	try {
		const email = req.params.mail;
		const user = await User.UserModel.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "User not found" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedNewPassword = await bcrypt.hash(req.params.newpassword, salt);

		user.password = hashedNewPassword;
		await user.save();
		res.status(200).json({ change: true });
		next();
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const roleStatus = async (req, res) => {
	const token = req.cookies.token;
	if (!token)
		return res
			.status(401)
			.json({ isAdmin: false, message: "No token provided" });

	try {
		const decodedToken = jwt.verify(token, process.env.JWT);
		res.json({ isAdmin: decodedToken.isAdmin });
	} catch (error) {
		console.error("Error verifying token:", error);
		res
			.status(403)
			.json({ isAdmin: false, message: "Failed to authenticate token" });
	}
};

module.exports = {
	loginUser,
	changeUserPassword,
	roleStatus,
};
