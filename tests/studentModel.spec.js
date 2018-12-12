var expect = require('chai').expect;
 
var studentModel = require('../models/student_profile');
 
describe('Student Model', function() {
    it('should be invalid if email is empty', function(done) {
        var s =  new studentModel.studentProfile();
 
        s.validate(function(err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });
});