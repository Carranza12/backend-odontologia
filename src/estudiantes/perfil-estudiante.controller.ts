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
    UseInterceptors,
    UploadedFile,
    Put,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { AuthGuard } from 'src/user-auth/auth.guard';

  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { fileFilter, renameImage } from 'src/user-auth/helpers/avatars.helper';
import { perfilEstudianteService } from './perfil-estudiante.service';
  
  @Controller('api/perfil/estudiantes/')
  export class perfilEstudianteController {
    constructor(private readonly perfil_estudiante: perfilEstudianteService) {}
  
    @Post()
    create(
      @Req() request: Request,
    ) {
      return this.perfil_estudiante.createOrUpdatePerfilEstudiante(request);
    }
  
    @Get()
    findAll() {
      return this.perfil_estudiante.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.perfil_estudiante.findOne(id);
    }

    
  
    @Put(':id')
    update(@Param('id') id: any, @Body() updatePatientDto: any) {
      return this.perfil_estudiante.update(id, updatePatientDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.perfil_estudiante.remove(+id);
    }
  }
  