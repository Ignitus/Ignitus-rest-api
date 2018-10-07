const mongoose = require('mongoose');

const professorProfileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
  },
  name: { type: String, match: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/ },
  bio: { type: String },
  address: { type: String },
  social_links: {
    facebook: { type: String },
    github: { type: String },
    linkedin: { type: String },
    google_plus: { type: String },
  },
  about: { type: String },
  profile_pic: { type: String },
  education: [{
    college_name: { type: String },
    position: { type: String },
    year_passed: { type: Number },
  }],
  research_fields: [String],
  publications: [{
    paper_name: { type: String },
    year_start: { type: Number },
    year_end: { type: Number },
    description: { type: String },
  }],
});

const professorProfile = mongoose.model('professorProfile', professorProfileSchema);

module.exports = {
  professorProfile,
};
