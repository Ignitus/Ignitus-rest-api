const mongoose = require('mongoose');

const user_roleSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

});

const user_roles = mongoose.model('users_role', user_roleSchema);

module.exports = {
  User_roles: user_roles,
};
