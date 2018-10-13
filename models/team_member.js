const mongoose = require('mongoose');

const teamMemberProfileSchema = mongoose.Schema({
  designation: {
    type: String,
  },
  name: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
  },
  social_links: {
    facebook: { type: String },
    github: { type: String },
    linkedin: { type: String },
  },
  profile_pic: {
    type: String,
  },
});

const teamMemberProfile = mongoose.model('teamMemberProfile', teamMemberProfileSchema);

module.exports = {
  teamMemberProfile,
}
