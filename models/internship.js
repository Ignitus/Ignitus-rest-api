const mongoose = require('mongoose');

const internshipSchema = mongoose.Schema({
  offeredBy: { type: String, required: true },
  details: { type: String, required: true },
  documentsRequired: { type: String, required: true },
});

const internships = mongoose.model('internships', internshipSchema);

module.exports = {
  Internships: internships,
};
