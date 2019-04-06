const request = require('supertest');
const app = require('../app');

describe('Entry Route', () => {
  it('should call the entry route', (done) => {
    request(app)
      .get('/api/')
      .expect(404, 'URL not found!')
      .end((err) => {
        if (err) throw done(err);
        done();
      });
  });
});
