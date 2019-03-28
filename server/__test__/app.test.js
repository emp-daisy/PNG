const request = require('supertest');
const app = require('../app');

describe('Entry Route', () => {
  it('should call the entry route', (done) => {
    request(app)
      .get('/')
      .expect(404, 'Route not found!')
      .end((err) => {
        if (err) throw done(err);
        done();
      });
  });
});
