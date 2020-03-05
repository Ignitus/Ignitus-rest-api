const express = require('express');

const router = express.Router();
const verify = require('../Middlewares/check-auth');
const Testimonial = require('../Controllers/testimonial');

router.get('/testimonials', Testimonial.viewAllTestimonial);
router.get(
  '/testimonial/:id',
  Testimonial.viewTestimonialByID,
);

router.post(
  '/testimonial/add',
  verify.verifyOrdinaryUser,
  verify.verifyAdmin,
  Testimonial.addTestimonial,
);

router.put(
  '/testimonial/:id/',
  verify.verifyOrdinaryUser,
  verify.verifyAdmin,
  Testimonial.updateTestimonial,
);

router.delete(
  '/testimonial/:id',
  verify.verifyOrdinaryUser,
  verify.verifyAdmin,
  Testimonial.deleteTestimonial,
);

module.exports = router;
