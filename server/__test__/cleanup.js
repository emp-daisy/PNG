const fs = require('fs');
const path = require('path');

module.exports = () => {
  const file = fs.createWriteStream(path.resolve(__dirname, '../database/phone_record.test.csv'));
  file.write('');
  file.end();
};
