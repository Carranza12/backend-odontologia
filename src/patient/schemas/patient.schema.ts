import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Patient {
  @Prop({ required: true })
  nombre_completo: string;

  @Prop({ required: false })
  fecha_de_nacimiento: string;

  @Prop({ required: false })
  genero: string;

  @Prop({ required: false })
  estado_civil: string;

  @Prop({ required: false })
  ocupacion: string;

  @Prop({ required: false })
  domicilio: string;

  @Prop({ required: false })
  telefono: string;

  @Prop({ required: false })
  ciudad_origen: string;

  @Prop({ required: false })
  estado_origen: string;

  @Prop({ required: false })
  pais_origen: string;

  @Prop({ required: false })
  ciudad_Actual: string;

  @Prop({ required: false })
  historia_clinica_id: string;

  @Prop({ required: false })
  nombre_contacto_emergencia: string;

  @Prop({ required: false })
  parentesco_contacto_emergencia: string;

  @Prop({ required: false })
  telefono_contacto_emergencia: string;
}

export type PatientDocument = Patient & Document;
export const PatientSchema = SchemaFactory.createForClass(Patient);
