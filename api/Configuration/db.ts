import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = () => mongoose.connect(config.mongoUrl);
