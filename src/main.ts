import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppModule.prefix);
  await app.listen(AppModule.port);

  Logger.log(`Server running on http://localhost:${AppModule.port}`, 'bootstrap');
}

bootstrap();
