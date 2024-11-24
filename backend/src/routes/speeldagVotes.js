const express = require("express");
const speeldagVoteController = require("../controllers/speeldagVoteController");
const validator = require("../middleware/validator");
const { schemas } = require("../validators");

const router = express.Router();

router
	.route("/:speeldagId/:userId/votes")
	.get(speeldagVoteController.getSpeeldagUserVotesById);

// this patch should be in route /:id
router
	.route("/update/:id")
	.patch(speeldagVoteController.updateSpeeldagVote);

router
	.route("/:id")
	.get(speeldagVoteController.getSpeeldagVoteById)
	.put(/* validator(schemas.createSpeeldagVoteSchema), */speeldagVoteController.createSpeeldageVote);

router.route("/").get(speeldagVoteController.getAllSpeeldagVotes);

module.exports = router;
