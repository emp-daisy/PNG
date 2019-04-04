const fs = require('fs');
const path = require('path');


const phonebook = {
  production: path.resolve(__dirname, '../database/phone_record.prod.csv'),
  development: path.resolve(__dirname, '../database/phone_record.staging.csv'),
  test: path.resolve(__dirname, '../database/phone_record.test.csv'),
  undefined: path.resolve(__dirname, '../database/phone_record.staging.csv'),
};

// sort the array numbers by the order passed
const sortNumbers = (phoneList, ascendingSort) => phoneList.sort((a, b) => {
  if (ascendingSort) { return a - b; }
  return b - a;
});

const generateNumber = (limit) => {
  const phoneList = new Set();
  while (phoneList.size < limit) {
    const randomNumber = `0${Math.floor(Math.random() * 900000000) + 100000000}`;
    phoneList.add(randomNumber);
  }
  return [...phoneList];
};

const readFromFile = () => {
  const phoneRecord = fs.readFileSync(phonebook[process.env.NODE_ENV], 'utf8');
  const dataArray = phoneRecord.split(/\r?\n/).filter(Boolean);// Remove empty string
  return dataArray;
};

const saveToFile = (phonenumber) => {
  const existingPhonenumbers = readFromFile(phonebook[process.env.NODE_ENV]);
  const arrayList = [...new Set([...existingPhonenumbers, ...phonenumber])];
  const file = fs.createWriteStream(phonebook[process.env.NODE_ENV]);
  /* istanbul ignore next */
  file.on('error', (error) => { throw (error); });
  arrayList.forEach((v) => { file.write(`${v}\n`); });
  file.end();
};

const getMinMax = (phonenumbers) => {
  const maxPhonenumber = phonenumbers.reduce((max, n) => (max > n ? max : n), phonenumbers[0]);
  const minPhonenumber = phonenumbers.reduce((min, n) => (min < n ? min : n), phonenumbers[0]);
  return {
    max: maxPhonenumber,
    min: minPhonenumber,
  };
};

module.exports = {
  sortNumbers,
  getMinMax,
  saveToFile,
  readFromFile,
  generateNumber,
};
