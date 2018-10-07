const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: String, required: true },
});


module.exports = {
  Testimonial: mongoose.model('testimonial', testimonialSchema),
};
