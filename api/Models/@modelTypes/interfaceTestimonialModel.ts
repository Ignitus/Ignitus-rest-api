import { Document } from 'mongoose';

export interface InterfaceTestimonialModel extends Document {
  author: string;
  description: string;
  authorDesignation: string;
  profilePicture?: string;
}
