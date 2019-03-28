const express = require('express');
// const phoneNumber = require('./routes');

const app = express();

// app.use('/phoneNumber', phoneNumber);

app.use('*', (_req, res) => {
  res.status(404).send('Route not found!');
});

module.exports = app;
