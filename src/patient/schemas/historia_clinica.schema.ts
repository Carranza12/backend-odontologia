import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ConsultaHistoriaClinicaI } from '../entities/consulta_historia.interface';

@Schema({ timestamps: true })
export class HistoriaClinica {
  @Prop({ required: true })
  Fecha: number;

  @Prop({ required: true })
  id_paciente: string;

  @Prop({ required: true })
  codigo: string;

  @Prop({ required: false })
  alcoholismo: boolean;

  @Prop({ required: false })
  tabaquismo: boolean;

  @Prop({ required: false })
  toxicomanias: boolean;

  @Prop({ required: false })
  higiene: boolean;

  @Prop({ required: false })
  alimentacion: boolean;

  @Prop({ required: false })
  condicion: boolean;

  @Prop({ required: false })
  socioconomia: boolean;

  @Prop({ required: false })
  habitos: boolean;


  @Prop({ required: false })
  ant_personales_otros_textarea: string;

  @Prop({ required: false })
  enf_infancia: boolean;

  @Prop({ required: false })
  Fimicos: boolean;

  @Prop({ required: false })
  Lueticos: boolean;

  @Prop({ required: false })
  Diabeticos: boolean;

  @Prop({ required: false })
  Quirurgicos: boolean;

  @Prop({ required: false })
  Traumaticos: boolean;

  @Prop({ required: false })
  Ictericos: boolean;

  @Prop({ required: false })
  Epilepticos: boolean;

  @Prop({ required: false })
  Alergicos: boolean;

  @Prop({ required: false })
  Reumaticos: boolean;

  @Prop({ required: false })
  Transfusiones: boolean;

  @Prop({ required: false })
  Enfermedades_Cardiovasculares: boolean;

  @Prop({ required: false })
  Incidencia_de_Infecciones_Bucales: boolean;

  @Prop({ required: false })
  Neoplasticas: boolean;

  @Prop({ required: false })
  SIDA: boolean;

  @Prop({ required: false })
  ant_personales_p_otros_textarea: String;

  @Prop({ required: false })
  padecimiento_principio: String;

  @Prop({ required: false })
  padecimiento_evolucion: String;

  @Prop({ required: false })
  padecimiento_estado_actual: String;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_apetito: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Masticacion: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Deglucion: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Disfagia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Nauseas: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Vomito: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Dolor_Abdominal: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Hematemsis: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Pirosis: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Meteorismo: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Diarrea: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Estrenimiento: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Melena: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Rectorragia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_digestivo_Otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Epistasis: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Tos: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Disnea: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Expectoracion: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Asma: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Dolor_al_respirar: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Disfonia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Gripa_frecuente: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_respiratorio_Otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Disnea_del_esfuerzo: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Dolor_retroesternal: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Palpitaciones: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Edema: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Lipotimias: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Calambres: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Cianosis: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Acufenos: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Fosfenos: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_circulatorio_Otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Frecuencia_de_micciones: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Color: string;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Diuria: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Nicturia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Hematuria: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Poliuria: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_genito_urinario_Otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Ansiedad: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Temor: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Convulciones: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Paralisis: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Temblores: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Tics: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Vista: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Oido: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Tacto: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sist_nervioso_Otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Variacion_de_peso: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Astenia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Adinamia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Fiebre: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Escalofrios: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_Anorexia: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_otros: boolean;

  @Prop({ required: false })
  aparatos_sistemas_sintomas_generales_otros_textarea: string;

  @Prop({ required: false })
  aparatos_sistemas_terapeutica_empleada: string;

  @Prop({ required: false })
  exploracion_fisica_raza_sexo_edad_facies_estado_conciencia: string;

  @Prop({ required: false })
  exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales: string;

  @Prop({ required: false })
  exploracion_fisica_signos_vitales: string;

  @Prop({ required: false })
  exploracion_fisica_TA: string;

  @Prop({ required: false })
  exploracion_fisica_frec_respiratoria: string;

  @Prop({ required: false })
  exploracion_fisica_temperatura: string;

  @Prop({ required: false })
  exploracion_fisica_peso: string;

  @Prop({ required: false })
  consultas: ConsultaHistoriaClinicaI[];

  @Prop({ required: false })
  odontogramas: any[];

  @Prop({ required: false })
  antecedentes_hereditarios: string;
  
  
}

export type HistoriaClinicaDocument = HistoriaClinica & Document;
export const HistoriaClinicaSchema = SchemaFactory.createForClass(HistoriaClinica);
