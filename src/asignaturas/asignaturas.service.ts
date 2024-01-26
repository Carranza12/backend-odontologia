import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { asignatura, asignaturaDocument } from './schemas/asignatura.schema';

@Injectable()
export class AsignaturaService {
  constructor(
    @InjectModel(asignatura.name)
    private readonly asignaturaModel: Model<asignaturaDocument>,
  ) {}

  // Método para obtener todas las asignaturas
  async getAllAsignaturas(): Promise<asignaturaDocument[]> {
    return this.asignaturaModel.find().exec();
  }

  // Método para obtener una asignatura por su ID
  async getAsignaturaById(id: string): Promise<asignaturaDocument> {
    const asignatura = await this.asignaturaModel.findById(id).exec();
    if (!asignatura) {
      throw new NotFoundException('Asignatura no encontrada');
    }
    return asignatura;
  }

  async getAsignaturasBySemestre(semestre: string,carrera:string): Promise<any> {
    const asignaturas = await this.asignaturaModel.find({ semestre, carrera }).exec();
    if (!asignaturas) {
      throw new NotFoundException('Asignaturas no encontradas');
    }
    return asignaturas;
  }

  async getAsignaturasByMaestro(maestro_id: string): Promise<any> {
    console.log("SERVICIO....")
    const asignaturas = await this.asignaturaModel.find({ maestro_id }).exec();
    if (!asignaturas) {
      throw new NotFoundException('Asignaturas no encontradas');
    }
    return asignaturas;
  }

  // Método para crear una nueva asignatura
  async createAsignatura(asignaturaData: any): Promise<asignaturaDocument> {
    const nuevaAsignatura = new this.asignaturaModel(asignaturaData);
    return nuevaAsignatura.save();
  }

  // Método para actualizar una asignatura por su ID
  async updateAsignatura(id: string, asignaturaData: any): Promise<asignaturaDocument> {
    const asignaturaActualizada = await this.asignaturaModel
      .findByIdAndUpdate(id, asignaturaData, { new: true })
      .exec();
    if (!asignaturaActualizada) {
      throw new NotFoundException('Asignatura no encontrada');
    }
    return asignaturaActualizada;
  }

  // Método para eliminar una asignatura por su ID
  async deleteAsignatura(id: string): Promise<asignaturaDocument> {
    const asignaturaEliminada = await this.asignaturaModel.findByIdAndRemove(id).exec();
    if (!asignaturaEliminada) {
      throw new NotFoundException('Asignatura no encontrada');
    }
    return asignaturaEliminada;
  }
}
