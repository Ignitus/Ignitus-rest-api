import { Document } from 'mongoose';

export interface InterfaceOpportunityModel extends Document {
  datePosted: string;
  decription: string;
  location: string;
  offeredBy: string;
  opportunityType: string;
  researchFields: string[];
  summary: string;
  stipend: number;
  title: string;
}
