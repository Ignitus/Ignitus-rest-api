var expect = require('chai').expect;
 
var testimonial = require('../models/testimonial');
 
describe('Testimonial Model', function() {
    it('should be invalid if all fields is empty', function(done) {
        var t =  new testimonial.Testimonial();
 
        t.validate(function(err) {
            expect(err.errors.author).to.exist;
            expect(err.errors.content).to.exist;
            expect(err.errors.source).to.exist;
            done();
        });
    });
});