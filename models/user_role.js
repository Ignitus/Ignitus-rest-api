const mongoose = require('mongoose');

const userRoleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

const userRoles = mongoose.model('usersRole', userRoleSchema);

module.exports = {
  UserRoles: userRoles,
};
