const express = require("express");
const speeldagController = require("../controllers/speeldagController");
const validator = require("../middleware/validator");
const { schemas } = require("../validators");

const router = express.Router();

router
	.route("/:id/wedstrijden")
	.get(speeldagController.getAllSpeeldagWedstrijden)
	.post(validator(schemas.createWedstrijdSchema), speeldagController.createSpeeldagWedstrijd);

router
	.route("/:id/speeldagVotes")
	.put(speeldagController.createSpeeldagVote);

router
	.route("/:id/klassement")
	.get(speeldagController.getSpeeldagKlassement)
	.post(speeldagController.createSpeeldagKlassement);

router
	.route("/:id")
	.get(speeldagController.getSpeeldagById)
	.patch(speeldagController.updateSpeeldag);

router
  .route('/:id/isOnline')
  .put(speeldagController.updateSpeeldagIsOnline);

router
  .route('/')
  .get(speeldagController.getAllSpeeldagen)
  .post(
    validator(schemas.createSpeeldagSchema),
    speeldagController.createSpeeldag
  );

module.exports = router;
