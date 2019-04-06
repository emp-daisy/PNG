const { Utils } = require('../../helper');

const mockArray = [
  '0911745894',
  '0575521077',
  '0422192687',
  '0505714277',
  '0133629454',
  '0269499339',
  '0163517707',
  '0261687023',
  '0343196326',
  '0360845711',
];
const mockArraySize = mockArray.length;

describe('Utils helper', () => {
  describe('SortNumbers', () => {
    it('should return array in ascending order', (done) => {
      const sortedArray = Utils.sortNumbers(mockArray, true);
      expect(sortedArray[0]).toEqual('0133629454');
      expect(sortedArray[mockArraySize - 1]).toEqual('0911745894');
      done();
    });
    it('should return array in descending order', (done) => {
      const sortedArray = Utils.sortNumbers(mockArray, false);
      expect(sortedArray[0]).toEqual('0911745894');
      expect(sortedArray[mockArraySize - 1]).toEqual('0133629454');
      done();
    });
  });
  describe('getMinMax', () => {
    it('should return the minimum and maximum numbers', (done) => {
      const minMax = Utils.getMinMax(mockArray);
      expect(minMax).toEqual({ min: '0133629454', max: '0911745894' });
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
});
