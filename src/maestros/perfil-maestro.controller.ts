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
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/user-auth/auth.guard';
import { perfilMaestroService } from './perfil-maestro.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from 'src/user-auth/helpers/avatars.helper';

@Controller('api/maestros')
export class perfilMaestroController {
  constructor(private readonly perfil_maestro: perfilMaestroService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('firma', {
      storage: diskStorage({
        destination: './src/assets/firmas',
        filename: renameImage,
      }),
      fileFilter,
    }),
  )
  create(
    @UploadedFile() firma: Express.Multer.File,
    @Req() request: Request,
  ) {
    return this.perfil_maestro.createOrUpdatePerfilMaestro(request, firma);
  }

  @Get()
  findAll() {
    return this.perfil_maestro.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfil_maestro.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: any) {
    return this.perfil_maestro.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfil_maestro.remove(+id);
  }
}
