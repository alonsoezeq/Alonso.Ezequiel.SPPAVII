'use strict'

require('dotenv').config();
require('./db');
const express = require('express');
const cors = require('cors');

const chefsRouter = require('./routes/chefs');
const usersRouter = require('./routes/users');

// Create the express app
const app = express();
app.use(express.json());

// Disable CORS
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}));

// Routes and middleware
app.use(`${process.env.BASE_PATH}/chefs`, chefsRouter);
app.use(`${process.env.BASE_PATH}/users`, usersRouter);

// Error handlers
app.use(function fourOhFourHandler (req, res) {
  res.status(404).send();
});
app.use(function fiveHundredHandler (err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (err) {  return console.error(err); }
  console.log(`Started at http://localhost:${port}`);
});
