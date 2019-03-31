const phone = require('./phone');

const routes = (app) => {
  app.use('/phonenumber', phone);
};

module.exports = routes;
