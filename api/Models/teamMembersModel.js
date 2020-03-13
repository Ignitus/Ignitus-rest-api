import mongoose from 'mongoose';
import { config } from '../Configuration/config.js';
const { regularExpressionUserName } = config;
const teamMembersSchema = mongoose.Schema({
  username: {
    type: String,
    match: regularExpressionUserName
  },
  description: {
    type: String
  },
  socialNetworkLinks: {
    facebook: { type: String },
    github: { type: String },
    linkedin: { type: String }
  },
  profilePicture: {
    type: String
  }
});

const TeamMember = mongoose.model('teamMembers', teamMembersSchema);
export default TeamMember;
