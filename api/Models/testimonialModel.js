import mongoose from 'mongoose';

const testimonialSchema = mongoose.Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  authorDesignation: { type: String, required: true },
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema)
export default Testimonial;