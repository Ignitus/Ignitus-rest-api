import mongoose from 'mongoose';

const opportunitySchema = mongoose.Schema({
  offeredBy: { type: String, required: true },
  details: { type: String, required: true },
  documentsRequired: { type: String, required: true }
});

const opportunity = mongoose.model('opportunity', opportunitySchema);
export default opportunity;
