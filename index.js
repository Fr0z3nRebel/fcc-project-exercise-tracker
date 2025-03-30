const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv').config()
const { createOrGetUserByUsername } = require('./handlers/createOrGetUserByUsernameHandler');
const { createExercise } = require('./handlers/createExerciseHandler');
const { getExerciseLogByUserId } = require('./handlers/getExerciseLogByUserIdHandler');
const { getAllUsers } = require('./handlers/getAllUsersHandler');

// Middleware
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Routes we need
//. POST /api/users
//.. This should create a new user
app.post('/api/users', async (req, res) => {
  const response = await createOrGetUserByUsername(req);
  res.json({
    username: response.username,
    _id: response._id,
  });
})
app.get('/api/users', async (req, res) => {
  const response = await getAllUsers();
  res.json(response);
});


//. POST /api/users/:_id/exercises
//.. This should create a new exercise for the given user id
app.post('/api/users/:_id/exercises', async (req, res) => {
  const response = await createExercise(req);

  const date = new Date(response.date).toDateString();

  const crResponse = {
    username: response.username,
    description: response.description,
    duration: response.duration,
    date: date,
    _id: req.params._id,
  };

  console.log("CreateExercise Response", crResponse);
  
  res.json(crResponse);
})
//. GET /api/users/:_id/logs?[from][&to][&limit]
//.. This should return the user's exercise log
//.. from, to, and limit query params should be optional
//.. from and to dates should be in the yyyy-mm-dd format
//.. limit should be a number that limits how many exercises in the respons
app.get('/api/users/:_id/logs', async (req, res) => {
  const response = await getExerciseLogByUserId(req);
  const date = new Date(response.date);
  res.json({
    _id: response._id,
    username: response.username,
    count: response.log.length,
    log: response.log,
  });
});




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
