const mongoose = require("mongoose");

// resultaten: 1 = thuis, X = gelijk, 2 = uit, 0 = niet gestemd
const resultaat = [1, 2, 3, 0];

const wedstrijdSchema = new mongoose.Schema({
	datum: {
		type: Date,
		required: true,
	},
	resultaat: {
		type: Number,
		enum: resultaat,
		default: "0",
	},
	thuis: {
		type: String,
		required: true,
	},
	uit: {
		type: String,
		required: true,
	},
});

const wedstrijdModel = mongoose.model("wedstrijd", wedstrijdSchema);

exports.wedstrijdModel = wedstrijdModel;
