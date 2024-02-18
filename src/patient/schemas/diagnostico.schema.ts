import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class diagnostico {
  @Prop({ required: true })
  historia_clinica_id: string;

  @Prop({ required: false })
  odontograma: string;

  @Prop({ required: false })
  fecha_de_la_consulta: string;

  @Prop({ required: false })
  motivos_de_la_consulta: string;

  
  @Prop({ required: false })
  comentarios_sobre_la_consulta: string;

  @Prop({ required: false })
  cabeza_craneo: string;

  @Prop({ required: false })
  cabeza_cara: string;

  @Prop({ required: false })
  boca_labios: string;

  @Prop({ required: false })
  boca_carrillos: string;

  @Prop({ required: false })
  boca_encia: string;

  @Prop({ required: false })
  boca_piso_de_boca: string;

  @Prop({ required: false })
  boca_lengua: string;

  @Prop({ required: false })
  boca_paladar: string;

  @Prop({ required: false })
  atm: string;

  @Prop({ required: false })
  atm_anexos: string;

  @Prop({ required: false })
  atm_macizo_oseo: string;

  @Prop({ required: false })
  cuello: string;

  @Prop({ required: false })
  torax: string;

  @Prop({ required: false })
  abdomen: string;

  @Prop({ required: false })
  extremidades: string;

  @Prop({ required: false })
  examenes_de_laboratorio: string;

  @Prop({ required: false })
  diagnostico: string;

  @Prop({ required: false })
  observaciones: string;

  @Prop({ required: false })
  paciente_referido_clinica: string;

  @Prop({ required: false })
  evidencia1: string;

  @Prop({ required: false })
  evidencia2: string;

  @Prop({ required: false })
  evidencia3: string;

  @Prop({ required: false })
  evidencia4: string;

  @Prop({ required: false })
  evidencia5: string;
}

export type diagnosticoDocument = diagnostico & Document;
export const diagnosticoSchema = SchemaFactory.createForClass(diagnostico);
