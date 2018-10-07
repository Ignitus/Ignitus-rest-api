const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  },
  password: { type: String },
  user_role: { type: String, required: true },
  verified: { type: Number, required: true },
  verifytoken: { type: String },
  linkedin: {
    profile_url: { type: String },
    access_token: { type: String },
  },
});

const users = mongoose.model('users', userSchema);

module.exports = {
  Users: users,
};
// module.exports=mongoose.model('Product',productSchema);
