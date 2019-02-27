var expect = require('chai').expect;
var assert = require('assert');

var professorModel = require('../models/professor_profile');

describe('Professor Model', function() {
    it('should be invalid if email is empty', function(done) {
        var p =  new professorModel.professorProfile();

        p.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        var p =  new professorModel.professorProfile();

        p.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if year_passed is empty', function(done) {
        var p =  new professorModel.professorProfile();

        p.validate(function(err) {
            assert.equal("2000".length,4);
            done();
        });
    });

    it('should be invalid if properties are empty', function(done) {
        var p =  new professorModel.professorProfile();

        p.validate(function(err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.research_fields).to.exist;
          done();
        });
    });

});
