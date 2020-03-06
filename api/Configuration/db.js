import mongoose from 'mongoose';
import { config } from './config.js';

const connectDB = () => mongoose.connect(config.mongoUrl);
export default connectDB;