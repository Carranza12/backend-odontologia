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
  @Get('/search')
  searchPatient(@Req() request: Request) {
    return this.patientService.searchPatients(request);
  }
  @Get('/dashboard-salud')
  dashboardData(@Req() request: Request) {
    return this.patientService.dashboard(request);
  }
  @Post('/diagnostico')
  createDiagnostico(@Req() request: Request) {
    return this.patientService.createDiagnostico(request);
  }
  @Post('/tratamientos')
  createTratamiento(@Req() request: Request) {
    return this.patientService.createTratamiento(request);
  }

  @Put('/tratamientos/update/:id')
  updateTratamiento(@Param('id') id: string, @Body() updatePatientDto: any, @Req() request: Request) {
    return this.patientService.updateTratamiento(id, updatePatientDto);
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

  @Get('/diagnostico-historia-clinica/:historia_clinica_id')
  findByHistoriaClinicaID(@Param('historia_clinica_id') historia_clinica_id: string) {
    return this.patientService.findDiagnosticosByHistoriaClinicaID(historia_clinica_id);
  }

  @Get('/tratamientos-historia-clinica/:historia_clinica_id')
  findTratamientosByHistoriaClinicaID(@Param('historia_clinica_id') historia_clinica_id: string) {
    return this.patientService.findTratamientosByHistoriaClinicaID(historia_clinica_id);
  }

  @Get('/historia_clinica/:id')
  findHistoriaClinica(@Param('id') historia_clinica_id: string) {
    return this.patientService.findHistoriaClinica(historia_clinica_id);
  }

  
  @Get('/diagnostico/:id')
  findDiagnostico(@Param('id') diagnostico_id: string) {
    return this.patientService.findDiagnostico(diagnostico_id);
  }

  @Get('/tratamientos/:id')
  findTratamiento(@Param('id') tratamiento_id: string) {
    return this.patientService.findTratamiento(tratamiento_id);
  }

  @Get('/historia_clinica/materia/:materia_id')
  findHistoriaByMateria(@Param('materia_id') materia_id: string) {
    return this.patientService.getHistoriasByMateria(materia_id);
  }

  @Get('/tratamientos/alumno/:alumno_id')
  findTratamientosByAlumno(@Param('alumno_id') alumno_id: string) {
    return this.patientService.getTratamientosByAlumno(alumno_id);
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
