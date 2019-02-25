const { expect } = require('chai');

const studentModel = require('../models/student_profile');

describe('Student Model', () => {
  it('should be invalid if email is empty', (done) => {
    const s = new studentModel.studentProfile();
    s.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });
});
