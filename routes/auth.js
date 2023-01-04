const express = require("express");

const router = express.Router();

const registerController = require("../controllers/RegisterController");
const authController = require("../controllers/AuthController");
const { validateUserInput } = require("../middlewares/UserInputValidation");
const {loginInputValidation} = require("../middlewares/LoginInputValidation");
const CatchAsync = require("../utils/CatchAsync");


router.post("/register", validateUserInput, registerController.createNewUser);
router.post("/login",  loginInputValidation, CatchAsync(authController.handleLogin));


module.exports = router;
