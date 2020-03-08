import mongoose from 'mongoose';
import { config } from '../Configuration/config.js';
const { regularExpressionEmail } = config;

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: regularExpressionEmail
  },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  verifyToken: { type: String, default: null },
  isUserVerified: { type: Number, default: false },
  admin: {
    type: Boolean,
    default: false
  },
  linkedin: {
    profileUrl: { type: String, default: null },
    accessToken: { type: String, default: null }
  },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpiration: { type: Date, default: null }
});

const Users = mongoose.model('users', userSchema);
export default Users;
