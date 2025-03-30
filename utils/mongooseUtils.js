const mongoose = require('mongoose');

function connectToMongoose() {
  mongoose.connect(process.env.MONGO_URI);
}

exports.connectToMongoose = connectToMongoose;
