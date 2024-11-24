const express = require("express");
const userController = require("../controllers/userController");
const validator = require("../middleware/validator");
const { schemas } = require("../validators");

const router = express.Router();

router.route("/jokers").patch(userController.updateUserJokers);

router
	.route("/:id")
	.get(userController.getUserById)
	.patch(validator(schemas.updateUserSchema), userController.updateUser);

router
	.route("/")
	.get(userController.getAllUsers)
	.post(validator(schemas.createUserSchema), userController.createUser);

router.route("/jokers/:seasonId").get(userController.getJokersLeft);

module.exports = router;
