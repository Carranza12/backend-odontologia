import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { perfilEstudianteController } from './perfil-estudiante.controller';
import { perfilEstudianteService } from './perfil-estudiante.service';
import { perfilEstudiante, perfilEstudianteSchema } from './schemas/perfil-estudiante.schema';


@Module({
  controllers: [perfilEstudianteController],
  providers: [perfilEstudianteService],
  imports:  [
    UserAuthModule,
    MongooseModule.forFeature([
      {
        name: perfilEstudiante.name,
        schema: perfilEstudianteSchema,
      },
    ]),
  ]
})
export class estudiantesModule {}


