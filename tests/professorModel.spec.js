const expect = require('chai');

const professorModel = require('../models/professor_profile');

describe('Professor Model', () => {
  it('should be invalid if email is empty', (done) => {
    const p = new professorModel.professorProfile();
    p.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});
