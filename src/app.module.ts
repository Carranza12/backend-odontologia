import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HistoriaClinicaModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
