const { speeldagenModel } = require("../models/speeldag");
const { speeldagVoteModel } = require("../models/speeldagVote");
const { wedstrijdModel } = require("../models/wedstrijd");
const { wedstrijdVotesModel } = require("../models/wedstrijdVote");
const { seizoenModel } = require("../models/seizoen");
const { genereerWeekKlassement } = require("./klassementController");

// SPEELDAGEN

const getAllSpeeldagen = async (req, res) => {
  /* #swagger.tags = ['Speeldag'] */
  // #swagger.deprecated = true

  try {
    const speeldagen = await speeldagenModel
      .find()
      .populate('speeldagVotes')
      .populate('klassement')
      .populate('wedstrijden');
    res.status(200).json(speeldagen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSpeeldagById = async (req, res) => {
	/* #swagger.tags = ['Speeldag'] */
  try {
    const speeldag = await speeldagenModel
      .findById(req.params.id)
      .populate("speeldagVotes")
      .populate("klassement")
      .populate("wedstrijden");

		if (!speeldag) {
			return res.status(404).json({ message: "Speeldag not found." });
		}

    res.status(200).json(speeldag);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const createSpeeldag = async (req, res) => {
  /* #swagger.tags = ['Speeldag'] */
  // #swagger.deprecated = true
  const speeldag = new speeldagenModel({
    schiftingsvraag: req.body.schiftingsvraag,
    schiftingsantwoord: req.body.schiftingsantwoord,
    wedstrijden: req.body.wedstrijden,
    speeldagVotes: req.body.speeldagVotes,
    klassement: req.body.klassement,
    startDatum: req.body.startDatum,
    eindDatum: req.body.eindDatum,
  });

  try {
    const newSpeeldag = await speeldag.save();
    res.status(201).json(newSpeeldag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSpeeldag = async (req, res) => {
  /* #swagger.tags = ['Speeldag'] */

	try {
    const speeldag = await speeldagenModel.findById(req.params.id);
		if (!speeldag) {
			return res.status(404).json({ message: "Speeldag not found." });
		}

    if (req.body.schiftingsvraag != null) {
      speeldag.schiftingsvraag = req.body.schiftingsvraag;
    }
    if (req.body.schiftingsantwoord != null) {
      speeldag.schiftingsantwoord = req.body.schiftingsantwoord;
    }
    if (req.body.eindDatum != null) {
      speeldag.eindDatum = req.body.eindDatum;
    }
    if (req.body.startDatum != null) {
      speeldag.startDatum = req.body.startDatum;
    }

		const updatedSpeeldag = await speeldag.save({
			validateModifiedOnly: true,
		});
		res.status(201).json(updatedSpeeldag);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateSpeeldagIsOnline = async (req, res) => {
  const { isOnline } = req.body;
  console.log(isOnline);
  /* #swagger.tags = ['Speeldag'] */
  try {
    // Update alleen het `isOnline`-veld van de speeldag
    const updatedSpeeldag = await speeldagenModel.findByIdAndUpdate(
      req.params.id,
      { isOnline },
      { new: true }
    );

    if (!updatedSpeeldag) {
      return res.status(404).json({ message: 'Speeldag not found' });
    }

    res.status(200).json(updatedSpeeldag);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SPEELDAG WEDSTRIJDEN

const getAllSpeeldagWedstrijden = async (req, res) => {
	/* #swagger.tags = ['Speeldag'] */
	try {
    const speeldag = await speeldagenModel
      .findById(req.params.id)
      .populate("wedstrijden");

		if (!speeldag) {
			return res.status(404).json({ message: "Speeldag not found." });
		}

		res.status(200).json(speeldag.wedstrijden);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createSpeeldagWedstrijd = async (req, res) => {
	/* #swagger.tags = ['Speeldag'] */

	try {
    const speeldag = await speeldagenModel.findById(req.params.id);
    if (!speeldag) {
      return res.status(404).json({ message: "Speeldag not found." });
    }

    const wedstrijd = new wedstrijdModel({
      datum: req.body.datum,
      thuis: req.body.thuis,
      uit: req.body.uit,
    });

		const newWedstrijd = await wedstrijd.save();
		speeldag.wedstrijden.push(newWedstrijd);
		await speeldag.save();
		res.status(201).json(newWedstrijd);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

//SPEELDAG VOTES

const createSpeeldagVote = async (req, res) => {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Put new speeldagVote.',
            schema: { $ref: '#/definitions/PutSpeeldagvote' }
    } */

	/* #swagger.tags = ['Speeldag'] */

	try {
    const speeldag = await speeldagenModel
      .findById(req.params.id)
      .populate({
        path: "speeldagVotes",
        populate: { path: "wedstrijdVotes" },
      });

    if (!speeldag) {
      return res.status(404).json({ message: "Speeldag not found." });
    }

    const speeldagVotes = speeldag.speeldagVotes;
    let userVotes = speeldagVotes.filter((vote) => vote.user == req.body.user)[0];
    if (!userVotes) {
      userVotes = new speeldagVoteModel({
        user: req.body.user,
        jokerGebruikt: req.body.jokerGebruikt,
        SchiftingsvraagAntwoord: req.body.SchiftingsvraagAntwoord,
        wedstrijdVotes: [],
      });
      userVotes = await userVotes.save();
    }

    const wedstrijdVotes = req.body.WedstrijdVotes;

    const wedstrijdVotesDB = userVotes.wedstrijdVotes;
    let newWedstrijdVote = undefined;
    !wedstrijdVotesDB
      ? undefined
      : (newWedstrijdVote = wedstrijdVotesDB.filter(
          (vote) => vote.wedstrijd == wedstrijdVotes[0].wedstrijd
        )[0]);
    if (!newWedstrijdVote) {
      newWedstrijdVote = new wedstrijdVotesModel({
        vote: wedstrijdVotes[0].vote,
        wedstrijd: wedstrijdVotes[0].wedstrijd,
      });
      newWedstrijdVote = await newWedstrijdVote.save();
      userVotes.wedstrijdVotes.push(newWedstrijdVote);
    } else {
      newWedstrijdVote.vote = wedstrijdVotes[0].vote;
      newWedstrijdVote = await newWedstrijdVote.save();
    }

		const newSpeeldagVote = await userVotes.save();
		speeldag.speeldagVotes.push(newSpeeldagVote);
		await speeldag.save();
		res.status(201).json(newSpeeldagVote);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// SPEELDAG KLASSEMENT

//get klassement
const getSpeeldagKlassement = async (req, res) => {
	/* #swagger.tags = ['Klassement'] */
	try {
    const speeldag = await speeldagenModel.findById(req.params.id);
    if (!speeldag) {
      return res.status(404).json({ message: "Speeldag not found." });
    }

		const seizoen = await seizoenModel.findOne({
			speeldagen: { $in: speeldag },
		});
		if (seizoen.bevriesKlassement) {
			res.status(201).json({ message: "Klassement Bevroren." });
		} else {
			const speeldagKlassement = await speeldagenModel
        .findById(speeldag.id)
        .populate({
          path: "klassement",
          model: "speeldagKlassementEntry",
        });
			res.status(200).json(speeldagKlassement);
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createSpeeldagKlassement = async (req, res) => {
	/** #swagger.tags = ['Klassement']
	 *  #swagger.summary = 'update klassement'
	 */
	// delete all klassementEntries
	const speeldag = await speeldagenModel.findById(req.params.id);
  if (!speeldag) {
    return res.status(404).json({ message: "Speeldag not found." });
  }

	speeldag.klassement = [];
	await speeldag.save();

	await genereerWeekKlassement(speeldag.id);
	res.status(200).json({ message: "Klassement generated succesfully" });
};

const speeldagController = {
  getAllSpeeldagen,
  getSpeeldagById,
  createSpeeldag,
  updateSpeeldag,
  getAllSpeeldagWedstrijden,
  updateSpeeldagIsOnline,
  createSpeeldagWedstrijd,
  createSpeeldagVote,
  getSpeeldagKlassement,
  createSpeeldagKlassement,
};

module.exports = speeldagController;
