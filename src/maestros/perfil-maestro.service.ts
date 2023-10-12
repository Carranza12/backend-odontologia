import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { perfilMaestro } from './entities/perfil-maestro.entity';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import * as jwt from 'jsonwebtoken';
import { perfilMaestroDocument } from './schemas/perfil-maestro.schema';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class perfilMaestroService {
  constructor(
    @InjectModel(perfilMaestro.name)
    private readonly perfilMaestroModel: Model<perfilMaestroDocument>,
    private _user_auth: UserAuthService,
  ) {}

  async createOrUpdatePerfilMaestro(req: any, firma: any) {
    const { body } = req;

    // Verifica si el usuario existe en perfilMaestroModel
    const existingPerfil = await this.perfilMaestroModel.findOne({
      _id: body.id_user,
    });

    const srcPath = path.join(__dirname, '../..', 'src', 'assets', 'firmas');
    const userId = body.id_user;
    const sourceFilePath = path.join(srcPath, firma.filename);
    const destFilePath = path.join(srcPath, `${userId}_firma${path.extname(firma.originalname)}`);

    fs.exists(sourceFilePath, async (exists) => {
      if (exists) {
        // Renombra el archivo si existe
        fs.rename(sourceFilePath, destFilePath, (err) => {
          if (err) {
            console.error('Error al renombrar el archivo:', err);
          } else {
            console.log('Archivo renombrado con éxito.');
          }
        });
      } else {
        console.error('El archivo original no existe.');
      }
    });

    body.firma = `http://localhost:3000/firmas/${userId}_firma.jpg`;

    let newPerfilMaestro;

    if (existingPerfil) {
      // Si el usuario existe, actualiza sus datos
      newPerfilMaestro = await this.perfilMaestroModel.findOneAndUpdate(
        { _id: body.id_user },
        { $set: body },
        { new: true }
      );
    } else {
      // Si el usuario no existe, crea un nuevo documento
      newPerfilMaestro = await this.perfilMaestroModel.create({
        ...body,
        _id: body.id_user,
      });
    }

    return {
      message: 'Perfil de maestro configurado exitosamente',
      item: newPerfilMaestro,
      error: null,
    };
  }

  async findAll() {
    try {
      const patients = await this.perfilMaestroModel.find({});
      return patients;
    } catch (error) {
      throw new Error('An error occurred while retrieving patients');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: any) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
