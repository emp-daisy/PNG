const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

routes(app);

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Wild card
app.all('*', (_req, res) => {
  res.status(404).send('URL not found!');
});

module.exports = app;
