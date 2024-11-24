const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	admin: {
		type: Boolean,
		default: false,
	},
	betaald: {
		type: Boolean,
		default: false,
	},
	username: {
		type: String,
		required: true,
		min: 1,
		max: 100,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		min: 1,
		max: 100,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 1,
		max: 100,
	},
	aantalJokers: {
		type: Number,
	},
});

const UserModel = mongoose.model("user", UserSchema);


module.exports = {
	UserModel,
};
