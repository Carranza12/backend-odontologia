import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class perfilEstudiante {
  @Prop({ required: true })
  id_user: string;

  @Prop({ required: true })
  semestre_actual: string;

  @Prop({ required: true })
  Matricula: string;

  
  @Prop({ required: true })
  carrera: string;

  @Prop({ required: true })
  materias: materia[];
}


interface materia{
  materia_id: string;
  practicas_realizadas:number;
}
export type perfilEstudianteDocument = perfilEstudiante & Document;
export const perfilEstudianteSchema =
  SchemaFactory.createForClass(perfilEstudiante);
