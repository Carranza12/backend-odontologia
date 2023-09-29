import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'trabajadores' })
export class UserTrabajador {

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

export type UserDocument = UserTrabajador & Document;
export const UserTrabajadorSchema = SchemaFactory.createForClass(UserTrabajador);