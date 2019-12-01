var expect = require('chai').expect;
 
var userModel = require('../models/user');
 
describe('User Model', function() {
    it('should be invalid if email and verification are empty', function(done) {
        var u =  new userModel.Users();
 
       	u.validate(function(err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.verified).to.exist;
            done();
        });
    });
});