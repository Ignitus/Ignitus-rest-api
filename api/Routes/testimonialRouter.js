import express from 'express';
import { verifyOrdinaryUser, verifyAdmin } from '../Middlewares/check-auth';

const router = express.Router();
const Testimonial = require('../Controllers/testimonialController');

router.get('/testimonials', Testimonial.viewAllTestimonial);
router.get(
  '/testimonial/:id',
  Testimonial.viewTestimonialByID,
);

router.post(
  '/testimonial/add',
  verifyOrdinaryUser,
  verifyAdmin,
  Testimonial.addTestimonial,
);

router.put(
  '/testimonial/:id/',
  verifyOrdinaryUser,
  verifyAdmin,
  Testimonial.updateTestimonial,
);

router.delete(
  '/testimonial/:id',
  verifyOrdinaryUser,
  verifyAdmin,
  Testimonial.deleteTestimonial,
);

module.exports = router;
