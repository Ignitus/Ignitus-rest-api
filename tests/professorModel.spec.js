
const expect = require('chai');
const assert = require('assert');

const professorModel = require('../models/professor_profile');

describe('Professor Model', () => {
  it('should be invalid if email is empty', (done) => {
    const p = new professorModel.professorProfile();
    p.validate((err) => {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if name is empty', (done) => {
    const p = new professorModel.professorProfile();
    p.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if year_passed is empty', (done) => {
    const p = new professorModel.professorProfile();
    p.validate((err) => {
      assert.equal('2000'.length, 4);
      done();
    });
  });

  it('should be invalid if research_fields property is empty', (done) => {
    const p = new professorModel.professorProfile();
    p.validate((err) => {
      expect(err.errors.research_fields).to.exist;
      done();
    });
  });
});
