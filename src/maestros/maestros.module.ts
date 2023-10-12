import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { perfilMaestroController } from './perfil-maestro.controller';
import { perfilMaestroService } from './perfil-maestro.service';
import { perfilMaestro } from './entities/perfil-maestro.entity';
import { perfilMaestroSchema } from './schemas/perfil-maestro.schema';

@Module({
  controllers: [perfilMaestroController],
  providers: [perfilMaestroService],
  imports:  [
    UserAuthModule,
    MongooseModule.forFeature([
      {
        name: perfilMaestro.name,
        schema: perfilMaestroSchema,
      },
    ]),
  ]
})
export class maestrosModule {}


