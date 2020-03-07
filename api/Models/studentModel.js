import mongoose from 'mongoose';

const studentProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  },
  username: {
    type: String,
    match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/
  },

  description: { type: String },
  address: { type: String },
  skills: [String],
  profilePicture: { type: String },
  curriculumVitae: { type: String },

  socialNetworkLinks: {
    facebook: { type: String },
    github: { type: String },
    linkedin: { type: String }
  },
  employment: {
    currentEmployment: { type: String },
    openForOpportunities: { type: Boolean }
  },
  education: {
    universityName: { type: String },
    position: { type: String },
    year_passed: { type: Number }
  },
  experience: [
    {
      companyName: { type: String },
      position: { type: String },
      startDate: { type: Number },
      endDate: { type: Number },
      description: { type: String }
    }
  ]
});

const Student = mongoose.model('student', studentProfileSchema);
export default Student;
