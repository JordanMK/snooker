const { speeldagenModel } = require("../models/speeldag");
const { seizoenModel } = require("../models/seizoen");
const seizoenKlassementEntry = require("../models/klassementEntries/seizoenKlassementEntry");
const { genereerSeizoenKlassement } = require("./klassementController");

//SEIZOENEN

const getSeizoenById = async (req, res) => {
	/** #swagger.tags = ['Seizoen']
	 *  #swagger.summary = 'get one seizoenen by id'
	 */
	try {
    const seizoen = await seizoenModel
      .findById(req.params.id)
      .populate("speeldagen")
      .populate("klassement");

    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

		res.status(200).json(seizoen);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllSeizoenen = async (req, res) => {
  /** #swagger.tags = ['Seizoen']
   * #swagger.summary = 'get all seizoenen'
   */
  try {
    const seizoenen = await seizoenModel
      .find()
      .populate({
        path: 'speeldagen',
        populate: { path: 'wedstrijden' },
      })
      .populate('klassement');
    res.status(200).json(seizoenen);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSeizoen = async (req, res) => {
  /** #swagger.tags = ['Seizoen']
   * #swagger.summary = 'add a new seizoen'
   */

  /*  #swagger.parameters['body'] = {
              in: 'body',
              description: 'Add new seizoen.',
              schema: { $ref: '#/definitions/AddSeizoen' }
      } */
  const seizoen = new seizoenModel({
    name: req.body.name,
    bevriesKlassement: req.body.bevriesKlassement,
    klassement: req.body.klassement,
    speeldagen: req.body.speeldagen,
    startdatum: req.body.startdatum,
    seizoenBeeindigd: req.body.seizoenBeeindigd,
    aantalJokers: req.body.aantalJokers,
  });
  try {
    const newSeizoen = await seizoen.save();
    res.status(201).json(newSeizoen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatedSeizoen = async (req, res) => {
	/* #swagger.tags = ['Seizoen'] */
  
	try {
    const seizoen = await seizoenModel.findById(req.params.id);
    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

    if (req.body.bevriesKlassement != null) {
      seizoen.bevriesKlassement = req.body.bevriesKlassement;
    }
    if (req.body.klassement != null) {
      seizoen.klassement = req.body.klassement;
    }
    if (req.body.speeldagen != null) {
      seizoen.speeldagen = req.body.speeldagen;
    }
    if (req.body.startdatum != null) {
      seizoen.startdatum = req.body.startdatum;
    }
    if (req.body.seizoenBeeindigd != null) {
      seizoen.seizoenBeeindigd = req.body.seizoenBeeindigd;
    }
    if (req.body.aantalJokers != null) {
      seizoen.aantalJokers = req.body.aantalJokers;
    }

		const updatedSeizoen = await seizoen.save({
			validateModifiedOnly: true,
		});

		res.status(201).json(updatedSeizoen);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteSeizoen = async (req, res) => {
	/* #swagger.tags = ['Seizoen'] */
	try {
    const seizoen = await seizoenModel.findById(req.params.id);
    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

		await seizoen.deleteOne();
		res.status(204).json({ message: "Deleted Seizoen" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// SEIZOEN SPEELDAGAEN

const getAllSeizoenSpeeldagen = async (req, res) => {
	/* #swagger.tags = ['Seizoen'] */
	try {
    const seizoen = await seizoenModel
      .findById(req.params.id)
      .populate("speeldagen");

    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

		if (!seizoen.speeldagen) {
			return res
				.status(404)
				.json({ message: "Speeldagen not found for this seizoen" });
		}

		res.status(200).json(seizoen.speeldagen);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSpeeldagenBySeizoenId = async (req, res) => {
  try {
    const seizoen = await seizoenModel.findById(req.params.id).populate({
      path: 'speeldagen',
      populate: {
        path: 'wedstrijden', // Populate the wedstrijden field in speeldagen
      },
    });
    if (!seizoen) {
      return res.status(404).json({ message: 'Seizoen niet gevonden' });
    }
    res.json(seizoen.speeldagen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSeizoenSpeeldag = async (req, res) => {
  /* #swagger.tags = ['Seizoen'] */

	try {
    const seizoen = await seizoenModel.findById(req.params.id);
    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

    const speeldag = new speeldagenModel({
      schiftingsantwoord: req.body.schiftingsantwoord,
      schiftingsvraag: req.body.schiftingsvraag,
      wedstrijden: req.body.wedstrijden,
      speeldagVotes: req.body.speeldagVotes,
      klassement: req.body.klassement,
      startDatum: req.body.startDatum,
      eindDatum: req.body.eindDatum,
    });

    const newSpeeldag = await speeldag.save();
		seizoen.speeldagen.push(newSpeeldag);
		const newSeizoen = await seizoen.save();
		res.status(201).json(newSeizoen);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// SEIZOEN KLASSEMENTEN

const getSeizoenKlassement = async (req, res) => {
	/* #swagger.tags = ['Klassement'] */
	try {
    const seizoen = await seizoenModel
      .findById(req.params.id)
      .populate({
        path: "klassement",
        model: "seizoenKlassementEntry",
      });

    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found" })
    }

		res.status(200).json(seizoen.klassement);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getLatestSeizoenKlassement = async (req, res) => {
	/** #swagger.tags = ['Klassement']
	 *  #swagger.summary = 'get latest klassement'
	 */
	//console.lsog("test")
	try {
		//get last season of array
		const seizoen = (await seizoenModel
      .find()
      .populate("klassement")
    ).filter((seizoen) => !seizoen.seizoenBeeindigd)[0];

    if (!seizoen) {
      return res.status(404).json({ message: "Seizoen not found." });
    }
		res.status(200).json(seizoen.klassement);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const createSeizoenKlassement = async (req, res) => {
  /** #swagger.tags = ['Klassement']
   *  #swagger.summary = 'Update klassement op basis van seasonId'
   *  #swagger.parameters['seasonId'] = { description: 'Het ID van het seizoen' }
   */
  const { seasonId } = req.params;

  if (!seasonId) {
    return res.status(400).json({ message: "SeasonId is required." });
  }

  // Zoek het seizoen op basis van seasonId
  const seizoen = await seizoenModel.findById(seasonId);
  if (!seizoen) {
    return res.status(404).json({ message: "Seizoen not found." });
  }

  // Reset de klassement array
  seizoen.klassement = [];
  await seizoen.save();

  // Verwijder alle bestaande klassementEntries uit de database
  const klassementEntries = await seizoenKlassementEntry.find();
  await Promise.all(
    klassementEntries.map((entry) =>
      seizoenKlassementEntry.findByIdAndDelete(entry._id)
    )
  );

  // Genereer het klassement voor het seizoen
  await genereerSeizoenKlassement(seasonId);

  res.status(200).json({ message: "Klassement generated successfully" });
};


const setSeizoenOnline = async (req, res) => {
  try{
    const { isOnline } = req.body;

    const updatedSeizoen = await seizoenModel.findByIdAndUpdate(
      req.params.id,
      {isOnline},
      {new: true} 
    );

    if(!updatedSeizoen){
      return res.status(404).json({ message: "Seizoen not found" });
    }

    res.status(200).json(updatedSeizoen);
  } catch(error){
    res.status(500).json({ message: error.message });
  }
}

const getSpeeldagBySeasonId = async (req, res) => {
  try{
    const seizoen = await seizoenModel.findById(req.params.id).populate('speeldagen');
    if(!seizoen){
      return res.status(404).json({ message: "Seizoen not found" });
    }

    const speeldagen = seizoen.speeldagen;
    
    const speeldag = speeldagen.find(s => s._id.toString() === req.params.speeldagId);

    if(!speeldag) {
      return res.status(404).json({ message: "Speeldag not found" });
    }

    res.status(200).json(speeldag);

  } catch(error){
    res.status(500).json({message: error.message})
  }

}

const seizoenController = {
  getSeizoenById,
  getAllSeizoenen,
  createSeizoen,
  updatedSeizoen,
  deleteSeizoen,
  getAllSeizoenSpeeldagen,
  getSpeeldagenBySeizoenId,
  createSeizoenSpeeldag,
  getSeizoenKlassement,
  getLatestSeizoenKlassement,
  createSeizoenKlassement,
  setSeizoenOnline,
  getSpeeldagBySeasonId,
};

module.exports = seizoenController;
