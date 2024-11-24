const express = require("express");
const wedstrijdController = require("../controllers/wedstrijdController");
const validator = require("../middleware/validator");
const { schemas } = require("../validators");

const router = express.Router();

router
	.route("/:id")
	.get(wedstrijdController.getWedstrijdById)
	.patch(wedstrijdController.updateWedstrijd)
	.delete(wedstrijdController.deleteWedstrijd);

router
	.route("/")
	.get(wedstrijdController.getAllWedstrijden)
	.post(validator(schemas.createWedstrijdSchema), wedstrijdController.createWedstrijd);

module.exports = router;
