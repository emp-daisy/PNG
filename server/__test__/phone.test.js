const request = require('supertest');
const app = require('../app');

describe('Phone Route', () => {
  describe('/phonenumber/generate', () => {
    it('should generate new numbers', (done) => {
      request(app)
        .get('/api/phonenumber/generate')
        .expect(200)
        .end((err, res) => {
          if (err) throw done(err);
          expect(res).toHaveProperty('body');
          const { body } = res;
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('phonenumbers');
          expect(body).toHaveProperty('size');
          expect(body).toHaveProperty('min');
          expect(body).toHaveProperty('max');
          expect(body.message).toEqual('Generated list');
          expect(body.size).toEqual(50);
          done();
        });
    });
    it('should generate 50 new numbers', (done) => {
      request(app)
        .get('/api/phonenumber/generate/?limit=50&sort=desc')
        .expect(200)
        .end((err, res) => {
          if (err) throw done(err);
          expect(res).toHaveProperty('body');
          const { body } = res;
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('phonenumbers');
          expect(body).toHaveProperty('size');
          expect(body).toHaveProperty('min');
          expect(body).toHaveProperty('max');
          expect(body.message).toEqual('Generated list');
          expect(body.size).toEqual(50);
          done();
        });
    });
    it('should generate 50 default numbers when limit of more than 50 is set', (done) => {
      request(app)
        .get('/api/phonenumber/generate/?limit=150&sort=desc')
        .expect(200)
        .end((err, res) => {
          if (err) throw done(err);
          expect(res).toHaveProperty('body');
          const { body } = res;
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('phonenumbers');
          expect(body).toHaveProperty('size');
          expect(body).toHaveProperty('min');
          expect(body).toHaveProperty('max');
          expect(body.message).toEqual('Generated list');
          expect(body.size).toEqual(50);
          done();
        });
    });
  });

  describe('/phonenumber/', () => {
    it('should return all generated numbers', async (done) => {
      request(app)
        .get('/api/phonenumber/')
        .expect(200)
        .end((err, res) => {
          if (err) throw done(err);
          expect(res).toHaveProperty('body');
          const { body } = res;
          expect(body).toHaveProperty('message');
          expect(body).toHaveProperty('phonenumbers');
          expect(body).toHaveProperty('size');
          expect(body).toHaveProperty('min');
          expect(body).toHaveProperty('max');
          expect(body.message).toEqual('List of generated numbers');
          done();
        });
    });
  });
});
