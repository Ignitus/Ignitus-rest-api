const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-z0-9_-]{3,15}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  },
  admin: {
    type: Boolean,
    default: false,
  },
  password: { type: String, required: true },
  user_role: { type: String, required: true },
  verified: { type: Number, default: false },
  verifytoken: { type: String, default: null },
  linkedin: {
    profile_url: { type: String, default: null },
    access_token: { type: String, default: null },
  },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
});

const users = mongoose.model('users', userSchema);

module.exports = {
  Users: users,
};
// module.exports=mongoose.model('Product',productSchema);
