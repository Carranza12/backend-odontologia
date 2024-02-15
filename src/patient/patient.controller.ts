import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Request, request } from 'express';
import { AuthGuard } from 'src/user-auth/auth.guard';

@Controller('api/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}


  @Post()
  create(@Req() request: Request) {
    return this.patientService.create(request);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }
  @Get('/codigo/:codigo_id')
  findByCode(@Param('codigo_id') codigo_id: string) {
    return this.patientService.findHistoriaClinicaByCodigo(codigo_id);
  }


  @Get('/historia_clinica/:id')
  findHistoriaClinica(@Param('id') historia_clinica_id: string) {
    return this.patientService.findHistoriaClinica(historia_clinica_id);
  }

  @Get('/historia_clinica/materia/:materia_id')
  findHistoriaByMateria(@Param('materia_id') materia_id: string) {
    return this.patientService.getHistoriasByMateria(materia_id);
  }

  @Get('/historia_clinica/estudiante/:id_estudiante')
  findHistoriaClinicabyEstudiante(@Param('id_estudiante') id_estudiante: string) {
    return this.patientService.findHistoriasClinicasPorEstudiante(id_estudiante);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: any) { 
    return this.patientService.updateHistoriaClinica(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }
}
