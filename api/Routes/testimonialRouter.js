import express from 'express';
import { verifyOrdinaryUser, verifyAdmin } from '../Middlewares/check-auth.js';

const testimonialRouter = express.Router();

import {
  viewAllTestimonial,
  viewTestimonialByID,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../Controllers/testimonialController.js';

testimonialRouter.get('/testimonials', viewAllTestimonial);
testimonialRouter.get(
  '/testimonial/:id',
  viewTestimonialByID,
);

testimonialRouter.post(
  '/testimonial/add',
  verifyOrdinaryUser,
  verifyAdmin,
  addTestimonial,
);

testimonialRouter.put(
  '/testimonial/:id/',
  verifyOrdinaryUser,
  verifyAdmin,
  updateTestimonial,
);

testimonialRouter.delete(
  '/testimonial/:id',
  verifyOrdinaryUser,
  verifyAdmin,
  deleteTestimonial,
);

export default testimonialRouter;
