import { Document } from 'mongoose';
export interface HistoriaClinica extends Document {
  readonly name: string;
  readonly age: number;
}
