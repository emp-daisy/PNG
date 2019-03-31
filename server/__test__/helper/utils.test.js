const fs = require('fs');

const { Utils } = require('../../helper');

const mockArray = [
  '09117458694',
  '05755291077',
  '04221692687',
  '05054714277',
  '01333629454',
  '02694992339',
  '01635127707',
  '02616087023',
  '03435196326',
  '03650845711',
];
const mockArraySize = mockArray.length;

describe('Utils helper', () => {
  describe('SortNumbers', () => {
    it('should return array in ascending order', (done) => {
      const sortedArray = Utils.sortNumbers(mockArray, true);
      expect(sortedArray[0]).toEqual('01333629454');
      expect(sortedArray[mockArraySize - 1]).toEqual('09117458694');
      done();
    });
    it('should return array in descending order', (done) => {
      const sortedArray = Utils.sortNumbers(mockArray, false);
      expect(sortedArray[0]).toEqual('09117458694');
      expect(sortedArray[mockArraySize - 1]).toEqual('01333629454');
      done();
    });
  });
  describe('getMinMax', () => {
    it('should return the minimum and maximum numbers', (done) => {
      const minMax = Utils.getMinMax(mockArray);
      expect(minMax).toEqual({ min: '01333629454', max: '09117458694' });
      done();
    });
  });
  describe('generateNumber', () => {
    it('should return array of 30 numbers', (done) => {
      const generateNumber = Utils.generateNumber(30);
      expect(generateNumber.length).toEqual(30);
      done();
    });
  });
  describe('SaveToFile', () => {
    it.skip('should fail when file does not exist', (done) => {
      // jest.mock('fs', () => ({ createWriteStream: Promise.reject() }));
      let file;
      try {
        // file = fs.createWriteStream('/path/to/missing/file');
      } catch (error) {
        jest.spyOn(fs, 'createWriteStream').mockImplementation(() => file);
      }
      // fs.createWriteStream = () => file;
      // const mock = jest.spyOn(fs, 'createWriteStream');
      // mock.mockImplementation(() => Promise.reject());
      Utils.saveToFile(mockArray);
      done();
    });
  });
});
