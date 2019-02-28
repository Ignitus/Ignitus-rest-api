const mongoose = require('mongoose');

const teamMemberProfileSchema = mongoose.Schema({
  description: {
    type: String,
  },
  title: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/,
  },
  social_links: {
    angellist: { type: String },
    linkedin: { type: String },
  },
  img: {
    type: String,
  },
});

const teamMemberProfile = mongoose.model('teamMemberProfile', teamMemberProfileSchema);

module.exports = {
  teamMemberProfile,
};
