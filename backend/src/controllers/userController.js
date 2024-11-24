const bcrypt = require("bcrypt");
const { seizoenModel } = require("../models/seizoen");
const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
	/* #swagger.tags = ['User'] */
	try {
		const users = await UserModel.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getUserById = async (req, res) => {
	/* #swagger.tags = ['User'] */
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
	try {
		// Check if the username or email already exists
		const existingUser = await UserModel.findOne({
			$or: [{ username: req.body.username }, { email: req.body.email }],
		});
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Username or email already exists" });
		}

		const user = new UserModel({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			aantalJokers: 4,
		});

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		const newUser = await user.save();

		const token = jwt.sign(
			{ _id: newUser.id, isAdmin: newUser.admin },
			process.env.JWT,
			{
				expiresIn: "1d",
			}
		);

		res.status(201).json({
			_id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			aantalJokers: newUser.aantalJokers,
			token: token,
		});
	} catch (err) {
		console.error("Error creating user:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const updateUser = async (req, res) => {
	/* #swagger.tags = ['User'] */
	try {
		const user = await UserModel.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const updateData = {
			betaald: req.body.betaald,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			aantalJokers: req.body.aantalJokers,
		};

		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			updateData.password = await bcrypt.hash(req.body.password, salt);
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			user._id,
			updateData,
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updateUserJokers = async (req, res) => {
	/* #swagger.tags = ['User'] */
	const users = await UserModel.find();
	await Promise.all(
		users.map(async (user) => {
			user.aantalJokers = 4;
			await user.save();
		})
	);
	const newUser = await UserModel.find();
	console.log(newUser);
	res.status(200).json();
};

const getJokersLeft = async (req, res) => {
	const { seasonId } = req.params;
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: "No token provided." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT);
		const userId = decoded._id;

		const seizoen = await seizoenModel.findById(seasonId).populate({
			path: "speeldagen",
			populate: { path: "speeldagVotes" },
		});

		if (!seizoen) {
			return res.status(404).json({ message: "Season not found." });
		}

		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const maxJokers = seizoen.aantalJokers;
		let jokersUsed = 0;

		for (const speeldag of seizoen.speeldagen) {
			for (const vote of speeldag.speeldagVotes) {
				if (vote.user.toString() === userId.toString() && vote.jokerGebruikt) {
					jokersUsed += 1;
				}
			}
		}

		const jokersLeft = Math.max(0, maxJokers - jokersUsed);

		res.status(200).json({
			userId,
			seasonId,
			seizoenJokers: maxJokers,
			jokersUsed,
			jokersLeft,
		});
	} catch (error) {
		console.error("Error calculating jokers left:", error);
		res.status(500).json({ message: error.message });
	}
};

const userController = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	updateUserJokers,
	getJokersLeft,
};

module.exports = userController;
