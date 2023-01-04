const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "Name should be minimum of 2 characters"],
    },
    
    lastName: {
      type: String,
      required: true,
      minLength: [2, "Name should be minimum of 2 characters"],
    },


    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [3, "Password should be minimum of 8 characters"],
    },
/*     roles: [{ type: mongoose.SchemaTypes.ObjectId, ref: "role" }],
    refreshToken: {
      type: [String],
    }, */

  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
