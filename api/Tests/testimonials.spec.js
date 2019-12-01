const { expect } = require('chai');

const testimonial = require('../models/testimonial');

describe('Testimonial Model', () => {
  it('should be invalid if all fields is empty', (done) => {
    const t = new testimonial.Testimonial();

    t.validate((err) => {
      expect(err.errors.author).to.exist;
      expect(err.errors.content).to.exist;
      expect(err.errors.source).to.exist;
      done();
    });
  });
});
