const { UserOut } = require('../models/UserOut');
const userService  = require('../services/UserService');

createNewUser = async (req, res) => {
    const { firstName,lastName, password, email} = req.body;

    try {
        const createdUser = await userService.createNewUser(firstName, lastName, email, password);
        const userOut = new UserOut(createdUser)
        res.status(201).json({success: `User with id ${createdUser._id}, created`,
    user: userOut});
    } catch (error) {
        console.log(error);
        res.json({error: error.message, stack: error.stack});
    }
};

module.exports = {createNewUser};
