import { Document } from 'mongoose';

export interface InterfaceOpportunityModel extends Document {
  offeredBy: string;
  details: string;
  documentsRequired: string;
}
