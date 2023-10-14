import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthService } from 'src/user-auth/user-auth.service';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { asignatura, asignaturaSchema } from './schemas/asignatura.schema';
import { AsignaturaService } from './asignaturas.service';
import { asignaturasController } from './asignaturas.controller';


@Module({
  controllers: [asignaturasController],
  providers: [AsignaturaService],
  imports:  [
    UserAuthModule,
    MongooseModule.forFeature([
      {
        name: asignatura.name,
        schema: asignaturaSchema,
      },
    ]),
  ]
})
export class asignaturasModule {}

