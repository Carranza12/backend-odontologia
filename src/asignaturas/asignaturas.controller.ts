import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
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
  
    @Post()
    async createAsignatura(@Body() asignaturaData: any) {
      const nuevaAsignatura = await this._asignaturas.createAsignatura(asignaturaData);
      return nuevaAsignatura;
    }
  
    // Ruta para actualizar una asignatura por su ID
    @Patch(':id')
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
  