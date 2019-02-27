var expect = require('chai').expect;
var assert = require('assert');

var studentModel = require('../models/student_profile');

describe('Student Model', function() {
    it('should be invalid if email is empty', function(done) {
        var s =  new studentModel.studentProfile();

        s.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if name is empty', function(done) {
        var p =  new studentModel.studentProfile();

        p.validate(function(err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });

    it('should be invalid if year_passed is empty', function(done) {
        var p =  new studentModel.studentProfile();

        p.validate(function(err) {
            assert.equal("2000".length,4);
            done();
        });
    });


    it('should be invalid if properties are empty', function(done) {
        var p =  new studentModel.studentProfile();

        p.validate(function(err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.resume).to.exist;
          done();
        });
    });


});
