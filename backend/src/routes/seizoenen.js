const express = require("express");
const seizoenController = require("../controllers/seizoenController");
const validator = require("../middleware/validator");
const { schemas } = require("../validators");

const router = express.Router();

router
	.route("/:id/speeldagen")
	.get(seizoenController.getSpeeldagenBySeizoenId)
	.post(validator(schemas.createSpeeldagSchema), seizoenController.createSeizoenSpeeldag);

router
	.route("/:id/klassement")
	.get(seizoenController.getSeizoenKlassement)
	.get(seizoenController.getLatestSeizoenKlassement);

router.route("/klassement/:seasonId").post(seizoenController.createSeizoenKlassement);

router.route("/:id/speeldag/:speeldagId").get(seizoenController.getSpeeldagBySeasonId);

router
	.route("/:id")
	.get(seizoenController.getSeizoenById)
	.patch(seizoenController.updatedSeizoen)
	.delete(seizoenController.deleteSeizoen);

router
	.route("/:id/isOnline")
	.put(seizoenController.setSeizoenOnline)

router
	.route("/")
	.get(seizoenController.getAllSeizoenen)
	.post(validator(schemas.createSeizoenSchema),seizoenController.createSeizoen);

module.exports = router;
