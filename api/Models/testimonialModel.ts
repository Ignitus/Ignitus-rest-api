import { Schema, model, Model } from 'mongoose';
import { InterfaceTestimonialModel } from './@modelTypes/interfaceTestimonialModel';

const testimonialSchema = new Schema({
  author: { type: String, required: true },
  description: { type: String, required: true },
  authorDesignation: { type: String, required: true },
  profilePicture: { type: String },
});

export const Testimonial: Model<InterfaceTestimonialModel> = model<
  InterfaceTestimonialModel
>('Testimonial', testimonialSchema);
