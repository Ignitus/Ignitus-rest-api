/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const userModel = require('../Models/user');

describe('User Model', () => {
  it('should be invalid if email and verification are empty', (done) => {
    const u = new userModel.Users();

    u.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});
