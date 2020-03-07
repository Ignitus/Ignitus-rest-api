import mongoose from 'mongoose';

const teamMembersSchema = mongoose.Schema({
  description: {
    type: String
  },
  title: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
  },
  social_links: {
    angellist: { type: String },
    linkedin: { type: String }
  },
  img: {
    type: String
  }
});

const teamMemberProfile = mongoose.model(
  'teamMembers',
  teamMembersSchema
);
export default teamMemberProfile;
