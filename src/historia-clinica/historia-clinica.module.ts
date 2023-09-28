import { Module } from '@nestjs/common';
import { HistoriaClinicaService } from './historia-clinica.service';
import { HistoriaClinicaController } from './historia-clinica.controller';
import { historiaClinicaProviders } from './historia-clinica.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoriaClinicaController],
  providers: [HistoriaClinicaService, ...historiaClinicaProviders],
})
export class HistoriaClinicaModule {}
