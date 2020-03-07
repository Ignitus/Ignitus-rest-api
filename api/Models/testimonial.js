import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: String, required: true },
});

const testimonial = mongoose.model('testimonial', testimonialSchema)
export default testimonial;