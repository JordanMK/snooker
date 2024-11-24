const mongoose = require("mongoose");

const speeldagSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	jokerGebruikt: {
		type: Boolean,
	},
	SchiftingsvraagAntwoord: {
		type: Number,
	},
	wedstrijdVotes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "wedstrijdVotes",
		},
	],
});

const speeldagVoteModel = mongoose.model("speeldagVote", speeldagSchema);

exports.speeldagVoteModel = speeldagVoteModel;
