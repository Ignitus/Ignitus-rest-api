const express = require('express');
const router = express.Router();

const Testimonial = require('../controllers/testimonial');

//Routes handling testimonial pages:

//add testimonial
router.post('/testimonial/add', Testimonial.addTestimonial);

//update testimonial
router.put('/testimonial/:id/', Testimonial.updateTestimonial);

//View all testimonials...for carousel to display testimonial on front-end
router.get('/testimonials', Testimonial.viewAllTestimonial);

//view testimonial by id
router.get('/testimonial/:id', Testimonial.viewTestimonialByID);

//delete testimonial (using id)
router.delete('/testimonial/:id', Testimonial.deleteTestimonial);

module.exports = router;
