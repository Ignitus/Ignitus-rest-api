import express, { Router } from 'express';
import { verifyOrdinaryUser, verifyAdmin } from '../Middlewares/check-auth';

import {
  fetchAllTestimonial,
  fetchTestimonialByID,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../Controllers/testimonialController';

export const testimonialRouter: Router = express.Router();

testimonialRouter.get('/testimonials', fetchAllTestimonial);
testimonialRouter.get(
  '/testimonial/:id',
  fetchTestimonialByID,
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
