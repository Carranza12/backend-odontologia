import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { AsignaturaService } from './asignaturas.service';
  
  @Controller('api/asignaturas') 
  export class asignaturasController {
    constructor(private readonly _asignaturas: AsignaturaService) {}
  
    @Get()
    async getAllAsignaturas() { 
      const asignaturas = await this._asignaturas.getAllAsignaturas();
      return asignaturas;
    }
  
    @Get(':id')
    async getAsignaturaById(@Param('id') id: string) {
      const asignatura = await this._asignaturas.getAsignaturaById(id);
      return asignatura;
    }

    
    @Get('/semestre/:semestre/:carrera')
    async getAsignaturasBySemestre(@Param('semestre') semestre: string,@Param('carrera') carrera: string) {
      const asignatura = await this._asignaturas.getAsignaturasBySemestre(semestre,carrera);
      return asignatura;
    }

    @Get('/maestro/:maestro_id')
    async getAsignaturasByMaestro(@Param('maestro_id') maestro_id: string) {
      const asignatura = await this._asignaturas.getAsignaturasByMaestro(maestro_id);
      return asignatura;
    }
  
    @Post()
    async createAsignatura(@Body() asignaturaData: any) {
      const nuevaAsignatura = await this._asignaturas.createAsignatura(asignaturaData);
      return nuevaAsignatura;
    }
  
    // Ruta para actualizar una asignatura por su ID
    @Put(':id')
    async updateAsignatura(@Param('id') id: string, @Body() asignaturaData: any) {
      const asignaturaActualizada = await this._asignaturas.updateAsignatura(id, asignaturaData);
      return asignaturaActualizada;
    }
  
    // Ruta para eliminar una asignatura por su ID
    @Delete(':id')
    async deleteAsignatura(@Param('id') id: string) {
      const eliminada = await this._asignaturas.deleteAsignatura(id);
      return { message: 'Asignatura eliminada' };
    }
  }
  