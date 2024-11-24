const mongoose = require("mongoose");

const resultaat = [1, 3, 2, 0];

const wedtrijdVotesSchema = new mongoose.Schema({
	vote: {
		type: Number,
		default: "0",
		enum: resultaat,
	},
	wedstrijd: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "wedstrijd",
		required: true,
	},
});

const wedstrijdVotesModel = mongoose.model(
	"wedstrijdVotes",
	wedtrijdVotesSchema
);

exports.wedstrijdVotesModel = wedstrijdVotesModel;
