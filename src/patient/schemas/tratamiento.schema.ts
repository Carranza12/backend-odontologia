import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tratamiento {
    @Prop({ required: true })
    historia_clinica_id: string;
    
    @Prop({ required: true })
    diagnostico_id: string;

    @Prop({ required: false })
    maestro_id: string;

    @Prop({ required: false })
    tratamiento: string;

    @Prop({ required: false })
    Alumno: string;

    @Prop({ required: false })
    matricula: string;

    @Prop({ required: false })
    no_expediente: string;

    @Prop({ required: false })
    fecha_tratamiento: string;

    @Prop({ required: false })
    observaciones: string;

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
export type TratamientoDocument = Tratamiento & Document;
export const TratamientoSchema = SchemaFactory.createForClass(Tratamiento);
