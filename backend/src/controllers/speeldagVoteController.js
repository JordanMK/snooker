const { UserModel } = require("../models/user");
const { speeldagenModel } = require("../models/speeldag");
const { speeldagVoteModel } = require("../models/speeldagVote");
const { wedstrijdVotesModel } = require("../models/wedstrijdVote");

const getAllSpeeldagVotes = async (req, res) => {
	/* #swagger.tags = ['SpeeldagVote'] */
	// #swagger.deprecated = true
	try {
		const speeldagVotes = await speeldagVoteModel.find();
		res.json(speeldagVotes);
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

const getSpeeldagVoteById = async (req, res) => {
	/* #swagger.tags = ['SpeeldagVote'] */
	// #swagger.deprecated = true
  try {
    const speeldagVote = speeldagVoteModel.findById(req.params.id);
    if(!speeldagVote) {
      return res.status(404).json({ message: "SpeeldagVote not found."});
    }
    res.status(200).json(speeldagVote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpeeldagUserVotesById = async (req, res) => {
	try {
		const speeldagId = req.params.speeldagId;
		const userId = req.params.userId;

		const wedstrijdenVotes = await getWedstrijdenVotes(speeldagId, userId);
    if(!wedstrijdenVotes) {
      return res.status(404).json({ message: "User votes not found."});
    }
		res.status(200).json(wedstrijdenVotes);
	} catch (err) {
		res.status(500).json({message: err.message});
	}
};

const createSpeeldageVote = async (req, res) => {
	try {
		/* #swagger.tags = ['SpeeldagVote'] */

    const speeldag = await speeldagenModel
      .findById(req.params.id)
      .populate("speeldagVotes");

    if(!speeldag) {
      return res.status(404).json({ message: "Speeldag not found."});
    }

		let newWedstrijdvotes = [];
		let newSpeeldagvote;
		if (req.body._id) {
			newSpeeldagvote = await speeldagVoteModel.findByIdAndUpdate(
				req.body._id,
				{
					user: req.body.user,
					jokerGebruikt: req.body.jokerGebruikt,
					SchiftingsvraagAntwoord: req.body.SchiftingsvraagAntwoord,
				},
				{ new: true } // Return the modified document
			);
		} else {
			if (req.body.wedstrijdVotes !== undefined) {
				for (const wedstrijdVote of req.body.wedstrijdVotes) {
					const newWedstrijdvote = new wedstrijdVotesModel({
						vote: wedstrijdVote.vote,
						wedstrijd: wedstrijdVote.wedstrijd,
					});
					await newWedstrijdvote.save();
					newWedstrijdvotes.push(newWedstrijdvote);
				}

				newSpeeldagvote = new speeldagVoteModel({
					user: req.body.user,
					jokerGebruikt: req.body.jokerGebruikt,
					SchiftingsvraagAntwoord: req.body.SchiftingsvraagAntwoord,
					wedstrijdVotes: newWedstrijdvotes,
				});

				const user = await UserModel.findById(req.body.user);
				if (user) {
					user.aantalJokers = req.body.aantalJokers;
					await user.save();
				}
			} else {
				newSpeeldagvote = new speeldagVoteModel({
					user: req.body.user,
					jokerGebruikt: req.body.jokerGebruikt,
					SchiftingsvraagAntwoord: req.body.SchiftingsvraagAntwoord,
				});
			}
		}

		await newSpeeldagvote.save();
		// Use push() method directly on speeldagVotes array
		speeldag.speeldagVotes.push(newSpeeldagvote);

		await speeldag.save();
		res.status(201).json(speeldag);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateSpeeldagVote = async (req, res) => {
	try {
    const speeldagVote = await speeldagVoteModel
      .findById(req.params.id)
      .populate("wedstrijdVotes");

    if(!speeldagVote) {
      return res.status(404).json({ message: "SpeeldagVote not found."});
    }

		if (req.body.jokerGebruikt !== undefined) {
			speeldagVote.jokerGebruikt = req.body.jokerGebruikt;
		}
		if (req.body.SchiftingsvraagAntwoord !== undefined) {
			speeldagVote.SchiftingsvraagAntwoord =
				req.body.SchiftingsvraagAntwoord;
		}
		if (req.body.wedstrijdVotes !== undefined) {
			// Iterate through the wedstrijdVotes array and update each element
			for (const wedstrijdVote of req.body.wedstrijdVotes) {
				// Find the wedstrijdvote by id
				const existingWedstrijdvote = await wedstrijdVotesModel.findById(
					wedstrijdVote._id
				);

				if (existingWedstrijdvote) {
					// Update the existing element with the new data
					existingWedstrijdvote.vote = wedstrijdVote.vote;
					existingWedstrijdvote.wedstrijd = wedstrijdVote.wedstrijd;
					// Save the updated document
					await existingWedstrijdvote.save();
				} else {
					// If the wedstrijdvote doesn't exist, create it
					const newWedstrijdvote = new wedstrijdVotesModel({
						vote: wedstrijdVote.vote,
						wedstrijd: wedstrijdVote.wedstrijd,
					});
					await newWedstrijdvote.save();
					speeldagVote.wedstrijdVotes.push(newWedstrijdvote);
				}
			}
		}
		if (req.body.user !== undefined) {
			const user = await UserModel.findById(req.body.user);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
			user.aantalJokers = req.body.aantalJokers;
			await user.save();
		}

		const updatedSpeeldagVote = await speeldagVote.save();
		res.status(201).json(updatedSpeeldagVote);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getWedstrijdenVotes = async (speeldagId, userId) => {
	const speeldag = await speeldagenModel.findById(speeldagId).populate({
		path: "speeldagVotes",
	});

  if (!speeldag) {
    return res.status(404).json({ message: "Speeldag not found."});
  }

	const user = await UserModel.findById(userId);
	const aantalJokers = user.aantalJokers;

	if (speeldag.speeldagVotes.length > 0) {
		speeldag.speeldagVotes = speeldag.speeldagVotes.find(
			(speeldagVote) => speeldagVote.user == userId
		);
		const speeldagVoteFromUser = await speeldagVoteModel
			.findById(speeldag.speeldagVotes)
			.populate({
				path: "wedstrijdVotes",
				populate: {
					path: "wedstrijd",
				},
			});
		if (speeldagVoteFromUser == null) {
			return {
				aantalJokers: aantalJokers,
				wedstrijdVotes: [],
			};
		}
		let obj = {
			_id: speeldagVoteFromUser._id,
			jokerGebruikt: speeldagVoteFromUser.jokerGebruikt,
			SchiftingsvraagAntwoord: speeldagVoteFromUser.SchiftingsvraagAntwoord,
			aantalJokers: aantalJokers,
		};
		if (speeldagVoteFromUser.wedstrijdVotes.length > 0) {
			obj.wedstrijdVotes = speeldagVoteFromUser.wedstrijdVotes;
			obj._id = speeldagVoteFromUser._id;
		}
		return obj;
	}
	return {
		aantalJokers: aantalJokers,
		wedstrijdVotes: [],
	};
};

const speeldagVoteController = {
	getAllSpeeldagVotes,
	getSpeeldagVoteById,
	getSpeeldagUserVotesById,
	createSpeeldageVote,
	updateSpeeldagVote,
};

module.exports = speeldagVoteController;
