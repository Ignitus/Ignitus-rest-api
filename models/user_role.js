const mongoose = require('mongoose');

const userRoleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

const userRoles = mongoose.model('users_role', userRoleSchema);

module.exports = {
  User_roles: userRoles,
};
