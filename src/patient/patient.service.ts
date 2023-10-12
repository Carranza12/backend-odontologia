import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel("Patient") private patientModel: Model<Patient>,
    private _user_auth:UserAuthService
  ) {}

  async create(req) {
    const { body } = req;
    const currentUser = await this._user_auth.getUserById(
      req.user.userId,
    );

    if (currentUser.role_default !== 'trabajador') {
      throw new UnauthorizedException(
        'No tienes permiso para crear un nuevo paciente.',
      );
    }

    const patientModelResult = await this.patientModel.create({
      ...body,
    });
    if(patientModelResult){
      return { message: 'Paciente registrado con exito!' };
    }
   


  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
