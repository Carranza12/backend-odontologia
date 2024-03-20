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
import { diagnostico, diagnosticoDocument } from './schemas/diagnostico.schema';
import { Tratamiento, TratamientoDocument } from './schemas/tratamiento.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private readonly patientModel: Model<PatientDocument>,
    @InjectModel(HistoriaClinica.name)
    private readonly historiaClinicaModel: Model<HistoriaClinicaDocument>,
    @InjectModel(diagnostico.name)
    private readonly diagnosticoModel: Model<diagnosticoDocument>,
    @InjectModel(Tratamiento.name)
    private readonly TratamientoModel: Model<TratamientoDocument>,
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

      const newPatient: any = await this.patientModel.create({
        ...body,
        //  fecha_de_nacimiento: timestamp_fecha_de_nacimiento,
      });

      const historia_clinica_id = await this.createHistoriaClinica(
        newPatient._id,
      );

      await this.patientModel.updateOne(
        { _id: newPatient._id },
        { $set: { historia_clinica_id: historia_clinica_id } },
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

  async createDiagnostico(req: any) {
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

    if (currentUser.role_default !== 'estudiante') {
      throw new UnauthorizedException(
        'No tienes permiso para crear un nuevo diagnostico.',
      );
    }

    try {
      const newDiagnostico: any = await this.diagnosticoModel.create({
        ...body,
      });
      /* 
      const imagenes = [
        'odontograma',
        'evidencia1',
        'evidencia2',
        'evidencia3',
        'evidencia4',
        'evidencia5',
      ]; */

      /*      const diagnostico_id = newDiagnostico._id;

      for (const imagen of imagenes) {
        if (body[imagen]) {
          const matches = body[imagen].match(/^data:(.*);base64,(.*)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            const extension = mimeType.split('/')[1];
            const uploadsDir = path.join(
              __dirname,
              '../..',
              'src',
              'assets',
              'historias_clinicas',
              `diagnosticos`,
              `${diagnostico_id}_${body[imagen]}`,
            );
            try {
              await fs.ensureDir(uploadsDir);

              const filename = `${body[imagen]}${extension}`;
              const filePath = path.join(uploadsDir, filename);
              await fs.writeFile(filePath, base64Data, 'base64');
            const imgPath = `http:localhost:3000/historias_clinicas/${filename}`;
              body[imagen] = imgPath;
              console.log('Archivo guardado con éxito:', imgPath);
            } catch (error) {
              console.error('Error al guardar el archivo:', error);
            }
          }
        }
      }

      const diagnosticoExistente =
        await this.diagnosticoModel.findById(diagnostico_id);
      diagnosticoExistente.set({ ...body });
      const diagnosticoActualizado = await diagnosticoExistente.save(); */

      return {
        message: 'Diagnostico creado exitosamente',
        item: newDiagnostico,
        error: null,
      };
    } catch (error) {
      console.error('Error al crear el diagnostico:', error);
      return {
        message: 'Error al crear el diagnostico',
        item: [],
        error,
      };
    }
  }
  async createTratamiento(req: any) {
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

    if (currentUser.role_default !== 'estudiante') {
      throw new UnauthorizedException(
        'No tienes permiso para crear un nuevo diagnostico.',
      );
    }

    try {
      const newTratamiento: any = await this.TratamientoModel.create({
        ...body,
      });

      await this.diagnosticoModel.updateOne(
        { _id: body.diagnostico_id },
        { tratamiento_id: newTratamiento._id },
      );

      return {
        message: 'Tratamiento creado exitosamente',
        item: newTratamiento,
        error: null,
      };
    } catch (error) {
      console.error('Error al crear el tratamiento:', error);
      return {
        message: 'Error al crear el tratamiento',
        item: [],
        error,
      };
    }
  }

  generateRandomId(length: number): string {
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id: string = '';
    for (let i: number = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }

  async createHistoriaClinica(id_paciente: string): Promise<string> {
    let nueva_id_historia: string;
    let idExiste: boolean = true;

    while (idExiste) {
      nueva_id_historia = this.generateRandomId(8); // Genera una nueva ID aleatoria
      // Verificar si la nueva ID de historia clínica ya existe en la base de datos
      const existingRecord = await this.historiaClinicaModel.findOne({
        id_historia: nueva_id_historia,
      });
      idExiste = !!existingRecord; // Si existingRecord es null, idExiste será false y saldrá del bucle
    }
    console.log('nuevo id: ', nueva_id_historia);
    const historia_clinica_item: any = {
      Fecha: new Date().getTime(),
      id_paciente: id_paciente,
      codigo: nueva_id_historia,
    };
    const res: any = await this.historiaClinicaModel.create(
      historia_clinica_item,
    );
    return res._id;
  }

  async updateHistoriaClinica(id_historia_clinica, nuevosDatos) {
    try {
      // Comprueba si la historia clínica existe
      const historiaClinicaExistente =
        await this.historiaClinicaModel.findById(id_historia_clinica);

      if (!historiaClinicaExistente) {
        throw new Error('Historia clínica no encontrada');
      }
      let pacienteBody = nuevosDatos.paciente;

      // Actualiza los datos de la historia clínica
      historiaClinicaExistente.set(nuevosDatos);
      const historiaClinicaActualizada = await historiaClinicaExistente.save();

      const pacienteExistente = await this.patientModel.findById(
        historiaClinicaActualizada.id_paciente,
      );
      if (!pacienteExistente) {
        throw new Error('paciente no encontrado');
      }
      pacienteExistente.set(pacienteBody);
      const pacienteExistenteActualizado = await pacienteExistente.save();

      return {
        historia_clinica: historiaClinicaActualizada,
        paciente: pacienteExistenteActualizado,
      };
    } catch (error) {
      throw new Error(
        `Error al actualizar la historia clínica: ${error.message}`,
      );
    }
  }

  async updateTratamiento(id_tratamiento, nuevosDatos) {
    try {
      // Comprueba si la historia clínica existe
      const tratamientoExistente =
        await this.TratamientoModel.findById(id_tratamiento);

      if (!tratamientoExistente) {
        throw new Error('Tratamiento no encontrado');
      }

      tratamientoExistente.set(nuevosDatos);
      const tratamientoActualizado = await tratamientoExistente.save();

      return {
        message: 'exitoso',
      };
    } catch (error) {
      throw new Error(`Error al actualizar el tratamiento: ${error.message}`);
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

  async getHistoriasByMateria(materia_id: string) {
    try {
      const historias = await this.historiaClinicaModel.find({
        consultas: {
          $elemMatch: {
            'practica_para_la_materia.value': `${materia_id}`,
          },
        },
      });
      return historias;
    } catch (error) {
      throw new Error('An error occurred while retrieving histories');
    }
  }

  async searchPatients(req) {
    try {
      const {
        nombre_completo,
        telefono,
        nombre_contacto_emergencia,
        telefono_contacto_emergencia,
      } = req.query;
      let query: any = {};

      if (nombre_completo) {
        query.nombre_completo = { $regex: new RegExp(nombre_completo, 'i') };
      }
      if (telefono) {
        const cleanedPhoneNumber = telefono.replace(/\D/g, '');
        const phoneNumberRegex = cleanedPhoneNumber.split('').join('\\d*');
        query.telefono = { $regex: new RegExp(phoneNumberRegex, 'i') };
      }
      if (nombre_contacto_emergencia) {
        query.nombre_contacto_emergencia = {
          $regex: new RegExp(nombre_contacto_emergencia, 'i'),
        };
      }
      if (telefono_contacto_emergencia) {
        const cleanedEmergencyPhoneNumber =
          telefono_contacto_emergencia.replace(/\D/g, '');
        const emergencyPhoneNumberRegex = cleanedEmergencyPhoneNumber
          .split('')
          .join('\\d*');
        query.telefono_contacto_emergencia = {
          $regex: new RegExp(emergencyPhoneNumberRegex, 'i'),
        };
      }

      const pacientes = await this.patientModel.find(query).limit(10);

      console.log('pacientes:', pacientes);
      return pacientes;
    } catch (error) {
      throw new Error('An error occurred while retrieving histories');
    }
  }

  async dashboard(req) {
    try {
      let data = {
        totalHistoriasClinicas: 0,
        totalPacientesDiabetes: 0,
        totalPacientes: 0,
        totalDiagnosticos: 0,
        diagnosticosSinTratamiento: 0,
        pacientesPorGenero: {
          masculino: 0,
          femenino: 0,
        },
        pacientesRecientes: []
      };

      data.totalHistoriasClinicas = await this.historiaClinicaModel.countDocuments();
      data.totalPacientes = await this.patientModel.countDocuments();
      data.totalPacientesDiabetes = await this.historiaClinicaModel.countDocuments({ Diabeticos: true });
      data.totalDiagnosticos = await this.diagnosticoModel.countDocuments();
      data.diagnosticosSinTratamiento = await this.diagnosticoModel.countDocuments({tratamiento_id: ""});
      data.pacientesPorGenero.masculino = await this.patientModel.countDocuments({genero: "Masculino"});
      data.pacientesPorGenero.femenino = await this.patientModel.countDocuments({genero: "Femenino"});
      data.pacientesRecientes = await this.patientModel.find().limit(10);
      return data;
    } catch (error) {
      throw new Error('An error occurred while retrieving histories');
    }
  }

  async getTratamientosByAlumno(alumno_id: string) {
    try {
      const tratamientos = await this.TratamientoModel.find({
        alumno_id: alumno_id,
      });
      return tratamientos;
    } catch (error) {
      throw new Error('An error occurred while retrieving histories');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  async findHistoriaClinicaByCodigo(codigo_id: string) {
    console.log('COPDIGO IDD:', codigo_id);
    const historia_clinica: any = await this.historiaClinicaModel.findOne({
      codigo: codigo_id,
    });
    console.log('item:', historia_clinica);
    if (!historia_clinica) {
      return {
        message: 'Historia clínica no encontrada',
        item: null,
        error: [],
      };
    }
    return {
      message: 'Historia clínica encontrada',
      item: historia_clinica,
      error: [],
    };
  }

  async findDiagnosticosByHistoriaClinicaID(historia_clinica_id: string) {
    console.log('IDD:', historia_clinica_id);
    const diagnosticos: any[] = await this.diagnosticoModel.find({
      historia_clinica_id: historia_clinica_id,
    });
    console.log('items:', diagnosticos);
    if (!diagnosticos || diagnosticos.length === 0) {
      return {
        message: 'Diagnósticos no encontrados',
        items: [],
        error: [],
      };
    }
    return {
      message: 'Diagnósticos encontrados',
      items: diagnosticos,
      error: [],
    };
  }

  async findTratamientosByHistoriaClinicaID(historia_clinica_id: string) {
    console.log('IDD:', historia_clinica_id);
    const tratamientos: any[] = await this.TratamientoModel.find({
      historia_clinica_id: historia_clinica_id,
    });
    console.log('items:', tratamientos);
    if (!tratamientos || tratamientos.length === 0) {
      return {
        message: 'tratamientos no encontrados',
        items: [],
        error: [],
      };
    }
    return {
      message: 'tratamientos encontrados',
      items: tratamientos,
      error: [],
    };
  }

  async findHistoriaClinica(historia_clinica_id: string) {
    const historia_clinica: any = await this.historiaClinicaModel.findOne({
      _id: historia_clinica_id,
    });
    if (!historia_clinica) {
      return {
        message: 'Historia clínica no encontrada',
        item: null,
        error: [],
      };
    }

    const paciente: any = await this.patientModel.findOne({
      _id: historia_clinica.id_paciente,
    });

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

  async findDiagnostico(diagnostico_id: string) {
    console.log('buscando diagnostico...');
    const diagnostico: any = await this.diagnosticoModel.findOne({
      _id: diagnostico_id,
    });
    if (!diagnostico) {
      return {
        message: 'Diagnostico no encontrado',
        item: null,
        error: [],
      };
    }

    return {
      message: 'Información consultada con éxito',
      item: diagnostico,
      error: [],
    };
  }

  async findTratamiento(tratamiento_id: string) {
    console.log('buscando tratamiento...');
    const tratamiento: any = await this.TratamientoModel.findOne({
      _id: tratamiento_id,
    });
    if (!tratamiento) {
      return {
        message: 'tratamiento no encontrado',
        item: null,
        error: [],
      };
    }

    return {
      message: 'Información consultada con éxito',
      item: tratamiento,
      error: [],
    };
  }

  async findHistoriasClinicasPorEstudiante(id_estudiante: string) {
    try {
      const historias_clinicas = await this.historiaClinicaModel.find({
        consultas: {
          $elemMatch: {
            'estudiante.id_estudiante': id_estudiante,
          },
        },
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
