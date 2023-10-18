import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { PatientDocument } from './schemas/patient.schema';
import * as jwt from 'jsonwebtoken';
import {
  HistoriaClinica,
  HistoriaClinicaDocument,
} from './schemas/historia_clinica.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(HistoriaClinica.name)
    private readonly historiaClinicaModel: Model<HistoriaClinicaDocument>,
    private _user_auth: UserAuthService,
  ) {}

  async create(req: any) {
    const { body } = req;

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de autorización no proporcionado');
    }
    const token = authHeader.slice(7);

    const decodedToken: any = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
      throw new UnauthorizedException('Token de autorización no válido');
    }

    const currentUser = await this._user_auth.getUserById(decodedToken.userId);

    if (currentUser.role_default !== 'trabajador') {
      throw new UnauthorizedException(
        'No tienes permiso para crear un nuevo paciente.',
      );
    }
    try {
      const fechaString = body.fecha_de_nacimiento;
      const partesFecha = fechaString.split('-');
      const dia = parseInt(partesFecha[0], 10);
      const mes = parseInt(partesFecha[1], 10) - 1;
      const ano = parseInt(partesFecha[2], 10);

      const fecha_de_nacimiento = new Date(ano, mes, dia);
      const timestamp_fecha_de_nacimiento = fecha_de_nacimiento.getTime();

      const newPatient = await this.patientModel.create({
        ...body,
        fecha_de_nacimiento: timestamp_fecha_de_nacimiento,
      });

      const historia_clinica_id = await this.createHistoriaClinica(
        newPatient._id,
      );

      await this.patientModel.updateOne(
        { _id: newPatient._id },
        { $set: { historia_clinica_id: historia_clinica_id } }
      );

      return {
        message: 'Paciente creado exitosamente',
        item: newPatient,
        error: null,
      };
    } catch (error) {
      console.error('Error al crear el paciente:', error);
      return {
        message: 'Error al crear el paciente',
        item: [],
        error,
      };
    }
  }

  async createHistoriaClinica(id_paciente) {
    const historia_clinica_item = {
      Fecha: new Date().getTime(),
      id_paciente,
    };
    const res = await this.historiaClinicaModel.create(historia_clinica_item);
    return res._id;
  }

  async findAll() {
    try {
      const patients = await this.patientModel.find({});
      return patients;
    } catch (error) {
      throw new Error('An error occurred while retrieving patients');
    }
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
