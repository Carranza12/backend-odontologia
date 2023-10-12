import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { UserAuthService } from 'src/user-auth/user-auth.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, UserAuthService],
  imports:  [
    MongooseModule.forFeature([{ name: 'Patients', schema: PatientSchema }]),
  ]
})
export class PatientModule {}


