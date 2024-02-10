import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { perfilMaestro } from './entities/perfil-maestro.entity';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import * as jwt from 'jsonwebtoken';
import { perfilMaestroDocument } from './schemas/perfil-maestro.schema';
import * as path from 'path';
import * as fs from 'fs-extra';
@Injectable()
export class perfilMaestroService {
  constructor(
    @InjectModel(perfilMaestro.name)
    private readonly perfilMaestroModel: Model<perfilMaestroDocument>,
    private _user_auth: UserAuthService,
  ) {}

  async createOrUpdatePerfilMaestro(req: any) {
    const { body } = req;

    // Verifica si el usuario existe en perfilMaestroModel
    const existingPerfil = await this.perfilMaestroModel.findOne({
      _id: body.id_user,
    });
    console.log("BODY:", body)

     const srcPath = path.join(__dirname, '../..', 'src', 'assets', 'firmas');
    const userId = body.id_user;
    if(body.firma){
      const sourceFilePath = path.join(srcPath, body.id_user + "_firma");

      const matches = body.firma.match(/^data:(.*);base64,(.*)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const base64Data = matches[2];
        const extension = mimeType.split('/')[1];
        const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'firmas');
        try {
          await fs.ensureDir(uploadsDir);
    
          const filename = `${body.id_user}_firma.${extension}`;
          const filePath = path.join(uploadsDir, filename);
          await fs.writeFile(filePath, base64Data, 'base64');
          body.firma = `http://localhost:3000/firmas/${userId}_firma.jpg`;
          console.log('Archivo guardado con éxito:', body.firma);
        } catch (error) {
          console.error('Error al guardar el archivo:', error);
        }
      }
    
  
      
    } 
   
   

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

  async findOne(id: string) {
    try {
      const patient = await this.perfilMaestroModel.findOne({ id_user: id });
      if (!patient) {
        throw new Error('Perfil de maestro no encontrado');
      }
      return patient;
    } catch (error) {
      throw new Error('Ocurrió un error al buscar el perfil de maestro por id_user');
    }
  }

  update(id: number, updatePatientDto: any) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
