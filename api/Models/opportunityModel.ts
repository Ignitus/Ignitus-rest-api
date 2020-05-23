import { Model, model, Schema } from 'mongoose';
import { InterfaceOpportunityModel } from './@modelTypes/interfaceOpportunityModel';

const opportunitySchema = new Schema({
  offeredBy: { type: String, required: true },
  details: { type: String, required: true },
  documentsRequired: { type: String, required: true },
});

export const Opportunity: Model<InterfaceOpportunityModel> = model<
  InterfaceOpportunityModel
>('opportunity', opportunitySchema);
