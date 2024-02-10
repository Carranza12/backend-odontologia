import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { Model } from 'mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { PatientDocument } from './schemas/patient.schema';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs-extra';

import {
  HistoriaClinica,
  HistoriaClinicaDocument,
} from './schemas/historia_clinica.schema';
import * as path from 'path';

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
    /*   const fechaString = body.fecha_de_nacimiento;
      const partesFecha = fechaString.split('-');
      const dia = parseInt(partesFecha[0], 10);
      const mes = parseInt(partesFecha[1], 10) - 1;
      const ano = parseInt(partesFecha[2], 10);

      const fecha_de_nacimiento = new Date(ano, mes, dia);
      const timestamp_fecha_de_nacimiento = fecha_de_nacimiento.getTime(); */

      const newPatient: any  = await this.patientModel.create({
        ...body,
      //  fecha_de_nacimiento: timestamp_fecha_de_nacimiento,
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
        item: { nombre_completo: body.nombre_completo, historia_clinica_id },
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

  async updateHistoriaClinica(id_historia_clinica, nuevosDatos) {
    try {
 
      // Comprueba si la historia clínica existe
      const historiaClinicaExistente = await this.historiaClinicaModel.findById(id_historia_clinica);
      let index = 1;
      for await(const consulta of nuevosDatos.consultas){
        if(consulta.evidencia1 ){
          const matches = consulta.evidencia1.match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'historias_clinicas', `${id_historia_clinica}`, `consulta_${index}` );
            try {
              await fs.ensureDir(uploadsDir);
        
              const filename = `Consulta_${index}_evidencia1.${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
              const imgPath = `http:localhost:3000/historias_clinicas/${id_historia_clinica}/consulta_${index}/${filename}`
              nuevosDatos.consultas[index - 1].evidencia1 = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
         
        }
        if(consulta.evidencia2){
          const matches = consulta.evidencia2.match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'historias_clinicas', `${id_historia_clinica}`, `consulta_${index}` );
            try {
              await fs.ensureDir(uploadsDir);
        
              const filename = `Consulta_${index}_evidencia2.${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
              const imgPath = `http:localhost:3000/historias_clinicas/${id_historia_clinica}/consulta_${index}/${filename}`
              nuevosDatos.consultas[index - 1].evidencia2 = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
         
        }
        if(consulta.evidencia3){
          const matches = consulta.evidencia3.match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'historias_clinicas', `${id_historia_clinica}`, `consulta_${index}` );
            try {
              await fs.ensureDir(uploadsDir);
        
              const filename = `Consulta_${index}_evidencia3.${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
              const imgPath = `http:localhost:3000/historias_clinicas/${id_historia_clinica}/consulta_${index}/${filename}`
              nuevosDatos.consultas[index - 1].evidencia3 = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
         
        }
        if(consulta.evidencia4){
          const matches = consulta.evidencia4.match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'historias_clinicas', `${id_historia_clinica}`, `consulta_${index}` );
            try {
              await fs.ensureDir(uploadsDir);
        
              const filename = `Consulta_${index}_evidencia4.${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
              const imgPath = `http:localhost:3000/historias_clinicas/${id_historia_clinica}/consulta_${index}/${filename}`
              nuevosDatos.consultas[index - 1].evidencia4 = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
          
        }
        if(consulta.evidencia5){
          const matches = consulta.evidencia5.match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(__dirname, '../..', 'src', 'assets', 'historias_clinicas', `${id_historia_clinica}`, `consulta_${index}` );
            try {
              await fs.ensureDir(uploadsDir);
        
              const filename = `Consulta_${index}_evidencia5.${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
              const imgPath = `http:localhost:3000/historias_clinicas/${id_historia_clinica}/consulta_${index}/${filename}`
              nuevosDatos.consultas[index - 1].evidencia5 = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
         
        }
        index++;
      }

      if (!historiaClinicaExistente) {
        throw new Error('Historia clínica no encontrada');
      }
      let pacienteBody = nuevosDatos.paciente;
      
      // Actualiza los datos de la historia clínica
      historiaClinicaExistente.set(nuevosDatos);
      const historiaClinicaActualizada = await historiaClinicaExistente.save();

      const pacienteExistente = await this.patientModel.findById(historiaClinicaActualizada.id_paciente);
      if (!pacienteExistente) {
        throw new Error('paciente no encontrado');
      }
      pacienteExistente.set(pacienteBody);
      const pacienteExistenteActualizado = await pacienteExistente.save();

  
      return {
        historia_clinica: historiaClinicaActualizada,
        paciente: pacienteExistenteActualizado
      }
    } catch (error) {
      throw new Error(`Error al actualizar la historia clínica: ${error.message}`);
    }
  }

  
  async findAll() {
    try {
      const patients = await this.patientModel.find({});
      return patients;
    } catch (error) {
      throw new Error('An error occurred while retrieving patients');
    }
  }

  async getHistoriasByMateria(materia_id:string) {
    try {
      const historias = await this.historiaClinicaModel.find({
        "consultas": {
          "$elemMatch": {
            "practica_para_la_materia.value": `${materia_id}`
          }
        }
      });
      return historias;
    } catch (error) {
      throw new Error('An error occurred while retrieving histories');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  async findHistoriaClinica(historia_clinica_id:string) {
    const historia_clinica: any = await this.historiaClinicaModel.findOne({ _id: historia_clinica_id });
    if (!historia_clinica) {
      return {
        message: 'Historia clínica no encontrada',
        item: null,
        error: [],
      };
    }
  
    const paciente: any = await this.patientModel.findOne({ _id: historia_clinica.id_paciente });
  
    if (!paciente) {
      return {
        message: 'Paciente no encontrado',
        item: null,
        error: [],
      };
    }
  
    return {
      message: 'Información consultada con éxito',
      item: {
        historia_clinica: historia_clinica._doc, 
        paciente: paciente._doc,
      },
      error: [],
    };
  }
  
  async findHistoriasClinicasPorEstudiante(id_estudiante: string) {
    try {
      const historias_clinicas = await this.historiaClinicaModel.find({
        'consultas': {
          $elemMatch: {
            'estudiante.id_estudiante': id_estudiante
          }
        }
      });
  
      if (historias_clinicas.length === 0) {
        return {
          message: 'No se encontraron historias clínicas para este estudiante',
          items: [],
        };
      }
  
      return {
        message: 'Historias clínicas encontradas',
        items: historias_clinicas,
      };
    } catch (error) {
      return {
        message: 'Error al buscar historias clínicas',
        items: [],
        error: error.message,
      };
    }
  }
  

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
