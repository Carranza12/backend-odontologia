import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './schemas/patient.schema';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { HistoriaClinica, HistoriaClinicaSchema } from './schemas/historia_clinica.schema';

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
  ]
})
export class PatientModule {}


