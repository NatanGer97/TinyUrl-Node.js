const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError } = require('../Errors/NotFoundError');
const { string } = require('joi');

async function handleLogin(req, res) {
    const {email, password} = req.body;
    console.log(req.body);
    
    if (!email || !password) {
        return res.status(400).json({error: 'email or/and password is missing'});
    }

    const foundUser = await UserModel.findOne({email: email}).exec();
    console.log(foundUser);
    if (!foundUser) {
        throw new NotFoundError('User not found');
    };

    // is user active?

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)

    if (!isPasswordCorrect) {
         res.status(401).json({error: 'Invalid password'});
    };

    // create token
    const jwtPayload = {
        userId: foundUser._id,
        email: foundUser.email,
        userFirstName: foundUser.firstName,
        userLastName: foundUser.lastName,
        
    }

    const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {expiresIn: '1h'});

     res.status(201).json({accessToken: accessToken});


};

module.exports = {handleLogin}