const mongoose = require("mongoose");
const { UserModel } = require("../daos/userDao");
const { connectToMongoose } = require("../utils/mongooseUtils");

async function createOrGetUserByUsername(req) {
  console.log("Incoming CreateOrGetUserByUsername request with body", req.body);

  // TODO: Input validation
  // TODO: Input object
  
  connectToMongoose();

  const user = new UserModel({
    username: req.body.username
  });

  let response = {};
  try{
    response = await user.save();
    console.log("User created", response.username);
  } catch (err) {
    if (err.code === 11000) {
      console.log("Username already exists. Looking up user.");
    }
    response = await UserModel.findOne({username: req.body.username});
    console.log("User found", response.username);
  }
  return response;
}

exports.createOrGetUserByUsername = createOrGetUserByUsername;
