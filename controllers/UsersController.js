
const { log } = require('console');
const { UserOut } = require('../models/UserOut');
const userService = require('../services/UserService');
const CatchAsync = require('../utils/CatchAsync');
exports.getUser = async (req, res) => {
    const { firstName, lastName} = req.query;
    try {
        const user = await userService.getUserByName(firstName, lastName);
        res.status(200).json({ user: user});
    } catch (error) {
        res.json({error: error.message, stack: error.stack});
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const user = await userService.getUserById(id);
         res.status(200).json({success: `User with id ${id} found`, user: user});
    } catch (error) {
         res.json({error: error.message, stack: error.stack});
    }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await userService.getUsers();
    if (users) {
        res.status(200).json({success: `Users found`, users: users});
    }
  }
  catch (error) {
    res.json({error: error.message, stack: error.stack});
  }
    
    
    
};