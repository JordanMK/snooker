const express = require("express");
const wedstrijdVoteController = require("../controllers/wedstrijdVoteController");
const validator = require("../middleware/validator.js");
const { schemas } = require("../validators");

const router = express.Router();

router
	.route("/:id")
	.get(wedstrijdVoteController.getWedstrijdVoteById);

router
	.route("/")
	.get(wedstrijdVoteController.getAllWedstrijdVotes)
	.post(validator(schemas.createWedstrijdVoteSchema), wedstrijdVoteController.createWedstrijdVote);

module.exports = router;
