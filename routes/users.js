const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');

router.get("/all", userController.getUsers);
router.get('/findByName', userController.getUser);
router.get('/findById/:id', userController.getUserById);


module.exports = router;
