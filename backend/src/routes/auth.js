const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router
	.post("/login", authController.loginUser)
	.patch("/changepw/:mail/:newpassword", authController.changeUserPassword)
	.get("/status", authController.roleStatus);

module.exports = router;
