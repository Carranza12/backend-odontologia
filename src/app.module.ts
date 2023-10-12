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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'src', 'assets', 'avatars'), // Ruta a la carpeta de avatares
      serveRoot: '/avatars', // Ruta de la URL para acceder a los archivos
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets', 'firmas'), // Ruta a la carpeta de firmas
      serveRoot: '/firmas', // Ruta de la URL para acceder a los archivos de firmas
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/odontologia'),
    UserAuthModule,
    PatientModule,
    maestrosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
