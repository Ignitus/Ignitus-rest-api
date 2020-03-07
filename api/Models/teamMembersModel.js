import mongoose from 'mongoose';

const teamMembersSchema = mongoose.Schema({
  title: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
  },
  description: {
    type: String
  },
  socialNetworkLinks: {
    angellist: { type: String },
    linkedin: { type: String }
  },
  picture: {
    type: String
  }
});

const TeamMember = mongoose.model(
  'teamMembers',
  teamMembersSchema
);
export default TeamMember;
