import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class perfilEstudiante {
  @Prop({ required: true })
  id_user: string;

  @Prop({ required: true })
  semestre_actual: string;

  @Prop({ required: true })
  materias: string[];
}

export type perfilEstudianteDocument = perfilEstudiante & Document;
export const perfilEstudianteSchema =
  SchemaFactory.createForClass(perfilEstudiante);
