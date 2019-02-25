const { expect } = require('chai');

const userModel = require('../models/user');

describe('User Model', () => {
  it('should be invalid if email and verification are empty', (done) => {
    const u = new userModel.Users();
    u.validate((err) => {
      expect(err.errors.email).to.exist;
      expect(err.errors.verified).to.exist;
      done();
    });
  });
});
