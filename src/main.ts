import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';

import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app:any = await NestFactory.create(AppModule);
  app.use(json({ limit: '5000mb' }));
  app.use(urlencoded({ extended: true, limit: '5000mb' }));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  app.enableCors({
    origin: 'http://148.212.195.49:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  });
  await app.listen(3000 );
}
bootstrap();