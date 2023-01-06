const ConflictError = require("../Errors/ConflictError");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const CatchAsync = require("../utils/CatchAsync");
const { NotFoundError } = require("../Errors/NotFoundError");
const { log } = require("console");
const { UserOut } = require("../models/UserOut");
exports.createNewUser = async (firstName, lastName, email, password) => {
  if (!email || !password) {
    throw new CredentialsError("Username or Password missing");
  }

  try {
    const isUserExisting = await UserModel.findOne({ email: email });
    if (isUserExisting) {
      throw new ConflictError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const user = await UserModel.findById(savedUser._id);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getUserByName = async (firstName, lastName) => {
  const user = await UserModel.findOne({ firstName: firstName, lastName: lastName }).exec();
  
  console.log(user);
  if (user) {
    return new UserOut(user);
  }
  throw new NotFoundError("user with name " + firstName + " " + lastName + " not found");
};

exports.getUserById = async (id) => {
    log(id);
  const user = await UserModel.findById(id).exec();
  log(user);
  if (user) {
    return new UserOut(user);
  }

  throw new NotFoundError("user with id " + id + " not found");
};

exports.getUsers = async () => {
  const users = await UserModel.find({}).exec();
  if (users.length > 0) {
    return users.map((user) => new UserOut(user));
  } 

};

exports.addTinyCodeToUser = async (email, tinyCode) => {
  const results = await UserModel.findOneAndUpdate({email: email}, {$push: {tinyCodes: tinyCode}}).exec();
  if (results) {
    console.log("added tinyCode to user");
    return results;
  }
  throw new Error("error adding tinyCode to user");
};
