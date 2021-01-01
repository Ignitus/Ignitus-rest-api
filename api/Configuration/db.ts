import mongoose from 'mongoose';
import { config } from './config';

export const connectDB = (): Promise<typeof import('mongoose')> =>
  mongoose.connect(config.mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
