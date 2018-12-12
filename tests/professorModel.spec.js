var expect = require('chai').expect;
 
var professorModel = require('../models/professor_profile');
 
describe('Professor Model', function() {
    it('should be invalid if email is empty', function(done) {
        var p =  new professorModel.professorProfile();
 
        p.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});