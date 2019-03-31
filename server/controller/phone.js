const { Utils } = require('../helper');

const PhoneController = {
  generate: (req, res) => {
    const { limit, sort } = req.query;
    const size = (limit && limit <= 50) ? +limit : 50;
    const sortAscending = !((sort && sort === 'desc'));
    const phonenumbers = Utils.generateNumber(size);
    const sortedPhonenumber = Utils.sortNumbers(phonenumbers, sortAscending);
    Utils.saveToFile(phonenumbers);
    const { max, min } = Utils.getMinMax(phonenumbers);

    return res.status(200).json({
      message: 'Generated list',
      phonenumbers: sortedPhonenumber,
      size,
      max,
      min,
    });
  },
  getNumbers: (req, res) => {
    const { sort } = req.query;
    const sortAscending = !((sort && sort === 'desc'));
    const phonenumbers = Utils.readFromFile();

    const size = phonenumbers.length;
    const sortedPhonenumber = Utils.sortNumbers(phonenumbers, sortAscending);
    const { max, min } = Utils.getMinMax(phonenumbers);

    return res.status(200).json({
      message: 'List of generated numbers',
      phonenumbers: sortedPhonenumber,
      size,
      max,
      min,
    });
  },
};

module.exports = PhoneController;
