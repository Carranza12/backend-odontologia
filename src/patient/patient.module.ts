import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { HistoriaClinica, HistoriaClinicaSchema } from './schemas/historia_clinica.schema';
import { diagnostico, diagnosticoSchema } from './schemas/diagnostico.schema';
import { Tratamiento, TratamientoSchema } from './schemas/tratamiento.schema';
import { perfilEstudiante, perfilEstudianteSchema } from 'src/estudiantes/schemas/perfil-estudiante.schema';
import { perfilMaestro } from 'src/maestros/entities/perfil-maestro.entity';
import { perfilMaestroSchema } from 'src/maestros/schemas/perfil-maestro.schema';
import { UserTrabajador, UserTrabajadorSchema } from 'src/user-auth/schemas/user-trabajador.schema';
import { User, UserSchema } from 'src/user-auth/schemas/user-auth.schema';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  imports:  [
    UserAuthModule,
    MongooseModule.forFeature([
      {
        name: Patient.name,
        schema: PatientSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: HistoriaClinica.name,
        schema: HistoriaClinicaSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: diagnostico.name,
        schema: diagnosticoSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Tratamiento.name,
        schema: TratamientoSchema,
      },
    ]),

    //AGREGAR LOS NUEVOS MODELOS 
    MongooseModule.forFeature([
      {
        name: perfilEstudiante.name,
        schema: perfilEstudianteSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: perfilMaestro.name,
        schema: perfilMaestroSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: UserTrabajador.name,
        schema: UserTrabajadorSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ]
})
export class PatientModule {}


