import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = () => mongoose.connect(config.mongoUrl);
