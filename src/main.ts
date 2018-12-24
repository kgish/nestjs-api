import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import 'dotenv/config';

const port = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'bootstrap');
}

bootstrap();
