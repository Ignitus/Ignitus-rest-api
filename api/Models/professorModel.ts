import { model, Schema } from 'mongoose';
const professorSchema: Schema = new Schema({});
export const Professor = model('Professor', professorSchema);
