import mongoose from 'mongoose';

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

module.exports = {
  teamMemberProfile: mongoose.model(
    'teamMemberProfile',
    teamMemberProfileSchema,
  ),
};
