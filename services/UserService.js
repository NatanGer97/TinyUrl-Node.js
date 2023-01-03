const ConflictError = require("../Errors/ConflictError");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
exports.createNewUser = async (name, email, password) => {
    if (!email || !password) {
        throw new CredentialsError("Username or Password missing");

    }
    

  try {
    const isUserExisting = await UserModel.findOne({email: email});
    if (isUserExisting) {
        throw new ConflictError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name: name,
        email: email,
        password: hashedPassword
    });

    const savedUser = await newUser.save();
    const user = await UserModel.findById(savedUser._id);

    return user;

    
  } catch (error) {
        throw new Error(error.message);
  }
  

    

};

