import { Document } from 'mongoose';
import { InterfaceOpportunityModel } from './interfaceOpportunityModel';

export interface InterfaceStudentModel extends Document {
  curriculumVitae: string;
  savedOpportunity: InterfaceOpportunityModel[];
}
