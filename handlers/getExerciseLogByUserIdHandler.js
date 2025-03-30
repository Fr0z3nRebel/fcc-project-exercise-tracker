const { UserModel } = require("../daos/userDao");
const { ExerciseModel } = require("../daos/exerciseDao");
const { connectToMongoose } = require("../utils/mongooseUtils");

// localhost:3000/api/users/67e8883292684fbd0010caa2/logs

async function getExerciseLogByUserId(req) {
  console.log("Incoming GetExerciseLogByUserId request", req.params, req.query);

  const from = req.query.from;
  const to = req.query.to;
  const limit = req.query.limit;


  connectToMongoose();

  const user = await UserModel.findById(req.params._id);
  console.log(user.username);

  let exerciseLog;

  if (req.query.from && req.query.to) {
    let from = new Date(req.query.from);
    let to = new Date(req.query.to);

    if (from == "Invalid Date") {
      from = new Date(0);
    } else {
      from = new Date(from);
    }

    if (to == "Invalid Date") {
      to = new Date();
    } else {
      to = new Date(to);
    }

    exerciseLog = await ExerciseModel.find({
      username: user.username,
      //date: { $gte: from, $lte: to },
    });
    console.log("excercise log before filter: ", exerciseLog)
  } else {
    exerciseLog = await ExerciseModel.find({
      username: user.username,
    });
  }

  if (req.query.limit) {
    const limit = parseInt(req.query.limit);
    exerciseLog = exerciseLog.slice(0, limit);
  }

  console.log("ExerciseLog", exerciseLog);

  return {
    username: user.username,
    count: exerciseLog.length,
    _id: user._id,
    log: exerciseLog.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
      };
    }),
  };
}


//   let userId = req.params._id;
//   let user = await User.findById(userId).select("username");
//   let count = await Exercise.countDocuments({ userId });
//   let log = await Exercise.find({ userId });

//   if (!user) {
//     return res.json({ error: "unknown userId" });
//   }

//   if (req.query.from || req.query.to) {
//     let from = new Date(req.query.from);
//     let to = new Date(req.query.to);
//     let limit = parseInt(req.query.limit);

//     if (from == "Invalid Date") {
//       from = new Date(0);
//     } else {
//       from = new Date(from);
//     }

//     if (to == "Invalid Date") {
//       to = new Date();
//     } else {
//       to = new Date(to);
//     }

//     log = await Exercise.find({ userId, date: { $gte: from, $lte: to } }).limit(
//       limit
//     );
//     count = log.length;
//   } else if (req.query.limit) {
//     let limit = parseInt(req.query.limit);
//     log = await Exercise.find({ userId }).limit(limit);
//     count = log.length;
//   }

//   res.json({
//     _id: user._id,
//     username: user.username,
//     count,
//     log,
//   });
// }

exports.getExerciseLogByUserId = getExerciseLogByUserId;
