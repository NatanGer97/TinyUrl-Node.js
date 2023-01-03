const express = require("express");

const router = express.Router();

const registerController = require("../controllers/RegisterController");
const { validateUserInput } = require("../middleware/UserInputValidation");

router.post("/register", validateUserInput, registerController.createNewUser);

module.exports = router;
