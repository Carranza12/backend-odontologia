import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import * as jwt from 'jsonwebtoken';
import * as path from 'path';
import * as fs from 'fs';
import { perfilEstudiante, perfilEstudianteDocument } from './schemas/perfil-estudiante.schema';

@Injectable()
export class perfilEstudianteService {
  constructor(
    @InjectModel(perfilEstudiante.name)
    private readonly perfilEstudianteModel: Model<perfilEstudianteDocument>,
    private _user_auth: UserAuthService,
  ) {}

  async createOrUpdatePerfilEstudiante(req: any) {
    const { body } = req;

    const existingPerfil = await this.perfilEstudianteModel.findOne({
      _id: body.id_user,
    });

    let newPerfilEstudiante;

    if (existingPerfil) {
      // Si el usuario existe, actualiza sus datos
      newPerfilEstudiante = await this.perfilEstudianteModel.findOneAndUpdate(
        { _id: body.id_user },
        { $set: body },
        { new: true }
      );
    } else {
      // Si el usuario no existe, crea un nuevo documento
      newPerfilEstudiante = await this.perfilEstudianteModel.create({
        ...body,
        _id: body.id_user,
      });
    }

    return {
      message: 'Perfil de estudiante configurado exitosamente',
      item: newPerfilEstudiante,
      error: null,
    };
  }

  async findAll() {
    try {
      const patients = await this.perfilEstudianteModel.find({});
      return patients;
    } catch (error) {
      throw new Error('An error occurred while retrieving patients');
    }
  }

  async findOne(id: string) {
    try {
      const patient = await this.perfilEstudianteModel.findOne({ id_user: id });
      if (!patient) {
        throw new Error('Perfil de estudiante no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error('Ocurrió un error al buscar el perfil de estudiante por id_user');
    }
  }

  update(id: number, updatePatientDto: any) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
