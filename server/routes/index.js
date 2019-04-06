const swaggerUi = require('swagger-ui-express');
const documentation = require('../helper/documentation.json');
const phone = require('./phone');

const routes = (app) => {
  app.use('/api/phonenumber', phone);
  //   // API Documentation
  app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(documentation));
};

module.exports = routes;
