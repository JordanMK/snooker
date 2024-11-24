const mongoose = require("mongoose");

const klassementEntrySchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		require: true,
	},
	score: {
		type: Number,
		require: true,
		default: 0,
	},
	plaats: {
		type: Number,
		require: true,
	},
	
}, {discriminatorKey: "klassementType"});

module.exports = mongoose.model(
	"klassementEntry",
	klassementEntrySchema
);

