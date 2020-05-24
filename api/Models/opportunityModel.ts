import { Model, model, Schema } from 'mongoose';
import { InterfaceOpportunityModel } from './@modelTypes/interfaceOpportunityModel';

const opportunitySchema = new Schema({
  datePosted: { type: Date, required: true },
  decription: { type: String, required: true },
  location: { type: String, required: true },
  offeredBy: { type: String, required: true },
  opportunityType: { type: String, required: true },
  researchFields: [{ type: String, required: true }],
  summary: { type: String, required: true },
  stipend: { type: Number, required: true },
  title: { type: String, required: true },
});

export const Opportunity: Model<InterfaceOpportunityModel> = model<
  InterfaceOpportunityModel
>('Opportunity', opportunitySchema);
