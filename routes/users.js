const express = require('express');
const router = express.Router();

const userController = require('../controllers/UsersController');
const jwtVerify = require('../middlewares/auth/verifyJWT');



router.get("/all", jwtVerify,userController.getUsers);
router.get('/findByName', jwtVerify,userController.getUser);
router.get('/findById/:id',jwtVerify, userController.getUserById);


module.exports = router;
