import mongoose from 'mongoose';
import { config } from '../Configuration/config';
const { regularExpressionEmail, regularExpressionUserName } = config;

const professorProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  email: {
    type: String,
    required: true,
    unique: true,
    match: regularExpressionEmail
  },
  username: {
    type: String,
    required: true,
    match: regularExpressionUserName
  },

  about: { type: String },
  address: { type: String },
  profilePicture: { type: String },
  curriculumVitae: { type: String },

  socialNetworkLinks: {
    facebook: { type: String },
    github: { type: String },
    linkedin: { type: String }
  },

  researchArea: {
    type: String
  },

  education: {
    university: { type: String },
    department: { type: String },
    graduationYear: { type: Number }
  },

  experience: [
    {
      company: { type: String },
      position: { type: String },
      startDate: { type: Number },
      endDate: { type: Number },
      description: { type: String }
    }
  ],

  publications: [
    {
      name: { type: String },
      startDate: { type: Number },
      endDate: { type: Number },
      description: { type: String }
    }
  ],

  recommendations: [
    {
      received: [
        {
          by: { type: String },
          content: { type: String }
        }
      ],
      given: [
        {
          to: { type: String },
          content: { type: String }
        }
      ]
    }
  ]
});

const Professor = mongoose.model('Professor', professorProfileSchema);
export default Professor;
