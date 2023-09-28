import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateHistoriaClinicaDto } from './dto/create-historia-clinica.dto';
import { UpdateHistoriaClinicaDto } from './dto/update-historia-clinica.dto';
import { HistoriaClinica } from './entities/historia-clinica.entity';

@Injectable()
export class HistoriaClinicaService {
  constructor(
    @Inject('HISTORIA_CLINICA_MODEL')
    private historiaClinicaModel: Model<HistoriaClinica>,
  ) {}

  create(createHistoriaClinicaDto: CreateHistoriaClinicaDto) {
    // Crea una instancia de historia clínica usando los datos de createHistoriaClinicaDto
    const created = new this.historiaClinicaModel(createHistoriaClinicaDto);
    
    console.log("ITEM:", created);
    
    // Guarda la instancia en la base de datos
    return created.save();
  }
  

  findAll() {
    return `This action returns all historiaClinica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiaClinica`;
  }

  update(id: number, updateHistoriaClinicaDto: UpdateHistoriaClinicaDto) {
    return `This action updates a #${id} historiaClinica`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiaClinica`;
  }
}
