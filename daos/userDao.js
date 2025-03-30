const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
});

const UserModel = new mongoose.model("User", userSchema);

exports.UserModel = UserModel;
