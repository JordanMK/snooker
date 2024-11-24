const { wedstrijdVotesModel } = require("../models/wedstrijdVote");

const getAllWedstrijdVotes = async (req, res) => {
	/* #swagger.tags = ['WedstrijdVote'] */
	// #swagger.deprecated = true
	try {
		const wedstrijdVotes = await wedstrijdVotesModel.find();
		res.status(200).json(wedstrijdVotes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getWedstrijdVoteById = async (req, res) => {
	/* #swagger.tags = ['WedstrijdVote'] */
	// #swagger.deprecated = true
  try {
    const wedstrijdVote = wedstrijdVotesModel.findById(req.params.id);
    if (!wedstrijdVote) {
      return res.status(404).json({ message: "WedstrijdVote not found." });
    }
    res.status(200).json(wedstrijdVote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWedstrijdVote = async (req, res) => {
	/* #swagger.tags = ['WedstrijdVote'] */
	// #swagger.deprecated = true
	const wedstrijdVote = new wedstrijdVotesModel({
		vote: req.body.vote,
		wedstrijd: req.body.wedstrijd,
	});
	try {
		const newWedstrijdVote = await wedstrijdVote.save();
		res.status(201).json(newWedstrijdVote);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const wedstrijdVoteController = {
	getAllWedstrijdVotes,
	getWedstrijdVoteById,
	createWedstrijdVote,
};

module.exports = wedstrijdVoteController;
