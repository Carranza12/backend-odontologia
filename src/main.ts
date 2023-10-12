import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  await app.listen(3000);
}
bootstrap();