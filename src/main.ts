import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

import 'dotenv/config';

const port = process.env.API_PORT || 3000;
const prefix = process.env.API_PREFIX || 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefix);
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'bootstrap');
}

bootstrap();
