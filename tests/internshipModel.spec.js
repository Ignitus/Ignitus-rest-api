const expect = require('chai');

const internshipModel = require('../models/internship');

describe('Internship Model', () => {
  it('should be invalid if properties are empty', (done) => {
    const m = new internshipModel.Internships();
    m.validate((err) => {
      expect(err.errors.offeredBy).to.exist;
      expect(err.errors.details).to.exist;
      expect(err.errors.documentsRequired).to.exist;
      done();
    });
  });
});
