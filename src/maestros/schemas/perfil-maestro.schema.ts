import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class perfilMaestro {
  @Prop({ required: true })
  id_user: string;

  @Prop({ required: true })
  expediente: string;

  @Prop({ required: true })
  cedula_profesional: string;

  @Prop({ required: true })
  universidad: string;

  @Prop({ required: true })
  especialidad: string;

  @Prop({ required: true })
  firma: string;
}

export type perfilMaestroDocument = perfilMaestro & Document;
export const perfilMaestroSchema = SchemaFactory.createForClass(perfilMaestro);
