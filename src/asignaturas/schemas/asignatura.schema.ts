import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class asignatura {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  carrera: string;

  @Prop({ required: true })
  maestro_id: string;

  @Prop({ required: true })
  semestre: string;
}

export type asignaturaDocument = asignatura & Document;
export const asignaturaSchema = SchemaFactory.createForClass(asignatura);
