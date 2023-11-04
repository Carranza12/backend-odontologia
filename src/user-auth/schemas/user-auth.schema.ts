import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {

  @Prop( { required: true })
  email: string;

  @Prop( { required: false } )
  password: string;

  @Prop( { required: true } )
  name: string;

  @Prop( { required: true } )
  last_name: string;

  @Prop( { required: true } )
  roles: string[];

  @Prop( { required: true } )
  role_default: string;

  @Prop( { required: true } )
  profileImage: string;

  @Prop( { required: false } )
  departamento: string;

  
  @Prop( { required: false } )
  puesto: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);