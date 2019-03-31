const express = require('express');
const swaggerUi = require('swagger-ui-express');
const documentation = require('./helper/documentation.json');
const routes = require('./routes');

const app = express();

routes(app);

// API Documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(documentation));

app.use('*', (_req, res) => {
  res.status(404).send('Route not found!');
});

module.exports = app;
