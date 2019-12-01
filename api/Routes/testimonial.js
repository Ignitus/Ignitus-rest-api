const express = require('express');

const router = express.Router();
const verify = require('../Middlewares/check-auth');

const Testimonial = require('../Controllers/testimonial');

router.post('/testimonial/add', Testimonial.addTestimonial);
router.put(
  '/testimonial/:id/',
  verify.checkStudentAuth,
  Testimonial.updateTestimonial,
);

router.get('/testimonials', Testimonial.viewAllTestimonial);
router.get(
  '/testimonial/:id',
  verify.checkStudentAuth,
  Testimonial.viewTestimonialByID,
);

router.delete(
  '/testimonial/:id',
  verify.checkStudentAuth,
  Testimonial.deleteTestimonial,
);

module.exports = router;
