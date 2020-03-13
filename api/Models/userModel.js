import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
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
