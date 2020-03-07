import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  source: { type: String, required: true },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema)
export default Testimonial;