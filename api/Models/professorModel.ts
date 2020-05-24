import { Model, model, Schema } from 'mongoose';
const professorSchema = new Schema({});
export const Professor = model('Professor', professorSchema);
