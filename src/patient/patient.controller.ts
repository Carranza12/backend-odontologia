import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Request, request } from 'express';
import { AuthGuard } from 'src/user-auth/auth.guard';

@Controller('api/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('/clinicas/all')
  async getAllClinicas(@Req() request: any): Promise<any[]> {
    try {
        return this.patientService.getAllClinicas();
    } catch (error) {
      console.log("ERROR", error)
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }
  
  @Get('/clinicas')
  async getClinicas(@Req() request: any): Promise<any[]> {
    try {
   
      request.query.page = request.query.page ? request.query.page : 1;

      const { name, level, telefono } = request.query;

      let filters: any = {};

      if (name) {
        filters.name = { $regex: new RegExp(name, 'i') };
      }

      if (level) {
        filters.level = { $regex: new RegExp(level, 'i') };
      }

      if (telefono) {
        filters.telefono = { $regex: new RegExp(telefono, 'i') };
      }

      return this.patientService.getClinicas(request.query.page, 5, filters);

    } catch (error) {
      console.log("ERROR:", error)
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }

  @Get('clinicas/:id')
  async getClinica(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
        return this.patientService.getClinicaById(id);
  
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para acceder a esta ruta.',
      );
    }
  }

  @Put('/clinicas/:id')
  async updateClinica(
    @Param('id') userId: string,
    @Body() body: any,
    @Req() request: Request,
  ): Promise<{ message: string }> {
    try {
      await this.patientService.updateClinica(userId, body);
      return { message: 'Clinica actualizado con éxito.' };
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para editar clinicas.',
      );
    }
  }

  @Delete('/clinicas/:id')
  async deleteClinica(
    @Param('id') userId: string,
    @Req() request: Request
  ): Promise<{ message: string }> {
    try {
      await this.patientService.deleteClinica(userId);
      return { message: 'Clinica eliminado con éxito.' };
    } catch (error) {
      throw new UnauthorizedException(
        'No tienes permiso para eliminar clinica.',
      );
    }
  }



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
  updateTratamiento(
    @Param('id') id: string,
    @Body() updatePatientDto: any,
    @Req() request: Request,
  ) {
    return this.patientService.updateTratamiento(id, updatePatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }
  @Get("/autocomplete/:name")
  findAutocompleteAll(@Param('name') name?: string) {
    return this.patientService.findAutocomplete(name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }
  @Get('/codigo/:codigo_id')
  findByCode(@Param('codigo_id') codigo_id: string) {
    return this.patientService.findHistoriaClinicaByCodigo(codigo_id);
  }
  @Get('/respaldo/:name_form')
  respaldoByFormInJSON(@Param('name_form') name_form: string) {
    return this.patientService.respaldoByFormInJSON(name_form);
  }

  @Post('/importar/:collectionName')
  importData(
    @Body() data: any,
    @Param('collectionName') collectionName: string,
  ) {
    return this.patientService.importData(data, collectionName);
  }

  @Post('/clinica/create')
  createClinica(@Body() data: any) {
    return this.patientService.createClinica(data);
  }

  

  @Get('/diagnostico-historia-clinica/:historia_clinica_id')
  findByHistoriaClinicaID(
    @Param('historia_clinica_id') historia_clinica_id: string,
  ) {
    return this.patientService.findDiagnosticosByHistoriaClinicaID(
      historia_clinica_id,
    );
  }

  @Get('/tratamientos-historia-clinica/:historia_clinica_id')
  findTratamientosByHistoriaClinicaID(
    @Param('historia_clinica_id') historia_clinica_id: string,
  ) {
    return this.patientService.findTratamientosByHistoriaClinicaID(
      historia_clinica_id,
    );
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

  @Get('/tratamientos/alumno/:alumno_id/:page/:limit')
  findTratamientosByAlumno(
    @Param('alumno_id') alumno_id: string,
    @Param('page') page: string,
    @Param('limit') limit: string,
  ) {
    let CurrentPage = Number(page);
    let CurrentLimit = Number(limit);
    return this.patientService.getTratamientosByAlumno(
      alumno_id,
      CurrentPage,
      CurrentLimit,
    );
  }

  @Get('/historia_clinica/estudiante/:id_estudiante')
  findHistoriaClinicabyEstudiante(
    @Param('id_estudiante') id_estudiante: string,
  ) {
    return this.patientService.findHistoriasClinicasPorEstudiante(
      id_estudiante,
    );
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
