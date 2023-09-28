import * as mongoose from 'mongoose';

export const historiaClinicaSchema = new mongoose.Schema({
  name: String,
  age: Number,
});