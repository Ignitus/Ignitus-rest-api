import mongoose from 'mongoose';

const userRoleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
});

// eslint-disable-next-line camelcase
const user_roles = mongoose.model('users_role', userRoleSchema);

module.exports = {
  User_roles: user_roles,
};
