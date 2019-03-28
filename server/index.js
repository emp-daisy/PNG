const app = require('./app');

const port = process.env.port || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}!`);
});
