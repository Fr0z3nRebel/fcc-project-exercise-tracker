const { UserModel } = require("../daos/userDao");
const { connectToMongoose } = require("../utils/mongooseUtils");

async function getAllUsers() {
  console.info("Incoming GetAllUsers request");

  connectToMongoose();

  return await UserModel.find();
}

exports.getAllUsers = getAllUsers;
