var expect = require('chai').expect;
 
var internshipModel = require('../models/internship');
 
describe('Internship Model', function() {
    it('should be invalid if properties are empty', function(done) {
        var m =  new internshipModel.Internships();
 
        m.validate(function(err) {
            expect(err.errors.offeredBy).to.exist;
            expect(err.errors.details).to.exist;
            expect(err.errors.documentsRequired).to.exist;
            done();
        });
    });
});