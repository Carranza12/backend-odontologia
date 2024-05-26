import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Clinica {

  @Prop( { required: true })
  name: string;

  @Prop( { required: true } )
  level: string;

  @Prop( { required: true } )
  telefono: string;
}

export type clinicaDocument = Clinica & Document;
export const clinicaSchema = SchemaFactory.createForClass(Clinica);