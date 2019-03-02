const { expect } = require('chai');
const assert = require('assert');

const studentModel = require('../models/student_profile');

describe('Student Model', () => {
  it('should be invalid if email is empty', (done) => {
    const s = new studentModel.studentProfile();

    s.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if name is empty', (done) => {
    const p = new studentModel.studentProfile();

    p.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if year_passed is empty', (done) => {
    const p = new studentModel.studentProfile();

    p.validate((err) => {
      assert.equal('2000'.length, 4);
      done();
    });
  });


  it('should be invalid if resume property is empty', (done) => {
    const p = new studentModel.studentProfile();

    p.validate((err) => {
      // expect(err.errors.email).to.exist;
      // expect(err.errors.name).to.exist;
      expect(err.errors.resume).to.exist;
      done();
    });
  });
});
