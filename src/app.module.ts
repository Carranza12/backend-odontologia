import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HistoriaClinicaModule } from './historia-clinica/historia-clinica.module';

@Module({
  imports: [HistoriaClinicaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
