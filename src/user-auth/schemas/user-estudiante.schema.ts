import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'trabajadores' })
export class UserEstudiante {

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  last_name: string;

  @Prop()
  role: string;

  
  @Prop()
  departamento: string;

  
  @Prop()
  puesto: string;

}

export type UserDocument = UserEstudiante & Document;
export const UserEstudianteSchema = SchemaFactory.createForClass(UserEstudiante);