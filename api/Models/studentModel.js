import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  curriculumVitae: { type: String },
  savedOpportunity: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' },
  ],
});

export const Student = mongoose.model('student', studentSchema);
