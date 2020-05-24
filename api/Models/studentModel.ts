import { Schema, model, Model } from 'mongoose';
import { InterfaceStudentModel } from './@modelTypes/interfaceStudentModel';

/** We plan to store curriculumVitae to Cloud, so type defenition will be a url => string as of now. */

const studentSchema = new Schema({
  curriculumVitae: { type: String },
  savedOpportunity: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }],
});

export const Student: Model<InterfaceStudentModel> = model<
  InterfaceStudentModel
>('Student', studentSchema);
