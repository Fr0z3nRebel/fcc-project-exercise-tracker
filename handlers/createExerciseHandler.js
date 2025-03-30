const { ExerciseModel } = require("../daos/exerciseDao");
const { UserModel } = require("../daos/userDao");
const { connectToMongoose } = require("../utils/mongooseUtils");

async function createExercise(req) {
  console.log("Incoming CreateExercise request", req.body, req.params);

  // If no date, set to today as default
  let date = req.body.date;
  if (!date) {
    const today = new Date();
    date = today.toISOString().split("T")[0];
    console.log("No date provided, setting to today", date);
  }

  connectToMongoose();

  console.log("User ID:", req.params._id);
  const user = await UserModel.findById(req.params._id);

  const exercise = new ExerciseModel({
    username: user.username,
    description: req.body.description,
    duration: req.body.duration,
    date: date,
  })

  let response = {}
  try {
    response = await exercise.save();
    console.log("Exercise created", response);
  } catch (err) {
    console.log("Error creating exercise", err);
  }
  return response;
}

exports.createExercise = createExercise;
