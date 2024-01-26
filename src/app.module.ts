import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './user-auth/user-auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PatientModule } from './patient/patient.module';
import { maestrosModule } from './maestros/maestros.module';
import { asignaturasModule } from './asignaturas/asignaturas.module';
import { estudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src', 'assets', 'avatars'), 
      serveRoot: '/avatars', 
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets', 'firmas'), 
      serveRoot: '/firmas', 
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/odontologia'),
    UserAuthModule,
    PatientModule,
    maestrosModule,
    asignaturasModule,
    estudiantesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
