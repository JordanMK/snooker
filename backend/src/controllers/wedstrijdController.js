const { wedstrijdModel } = require("../models/wedstrijd");

const getAllWedstrijden = async (req, res) => {
	/* #swagger.tags = ['Wedstrijd'] */
	// #swagger.deprecated = true
	try {
		const wedstrijden = await wedstrijdModel.find();
		res.status(200).json(wedstrijden);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getWedstrijdById = async (req, res) => {
	/* #swagger.tags = ['Wedstrijd'] */
  try {
    const wedstrijd = await wedstrijdModel.findById(req.params.id);
    if (!wedstrijd) {
      return res.status(404).json({ message: "Wedstrijd not found." });
    }
    res.status(200).json(wedstrijd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createWedstrijd = async (req, res) => {
	/* #swagger.tags = ['Wedstrijd'] */
	// #swagger.deprecated = true
	const wedstrijd = new wedstrijdModel({
		datum: req.body.datum,
		resultaat: req.body.resultaat,
		thuis: req.body.thuis,
		uit: req.body.uit,
	});
	try {
		const newWedstrijd = await wedstrijd.save();
		res.status(201).json(newWedstrijd);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const updateWedstrijd = async (req, res) => {
	/* #swagger.tags = ['Wedstrijd'] */
	try {
    const wedstrijd = await wedstrijdModel.findById(req.params.id);
    if (!wedstrijd) {
      return res.status(404).json({ message: "Wedstrijd not found." });
    }

    if (req.body.datum != null) {
      wedstrijd.datum = req.body.datum;
    }
    if (req.body.resultaat != null) {
      wedstrijd.resultaat = req.body.resultaat.toLowerCase();
    }
    if (req.body.thuis != null) {
      wedstrijd.thuis = req.body.thuis;
    }
    if (req.body.uit != null) {
      wedstrijd.uit = req.body.uit;
    }

		const updatedWedstrijd = await wedstrijd.save({
			validateModifiedOnly: true,
		});

		res.status(201).json(updatedWedstrijd);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const deleteWedstrijd = async (req, res) => {
	/* #swagger.tags = ['Wedstrijd'] */
	try {
    const wedstrijd = await wedstrijdModel.findById(req.params.id);
    if (!wedstrijd) {
      return res.status(404).json({ message: "Wedstrijd not found." });
    }

		await wedstrijd.deleteOne();
		res.status(204).json({ message: "Deleted Wedstrijd" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const wedstrijdController = {
	getAllWedstrijden,
	getWedstrijdById,
	createWedstrijd,
	updateWedstrijd,
	deleteWedstrijd,
};

module.exports = wedstrijdController;
