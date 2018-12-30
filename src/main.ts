import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const host = AppModule.host;
  const port = AppModule.port;
  const prefix = AppModule.prefix;
  const hostDomain = AppModule.environment === 'development' ? `${host}:${port}` : host;

  // Swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('Simple Mock Server for Testing')
    .setVersion('0.0.1')
    .setHost(hostDomain.split('//')[1])
    .setSchemes(AppModule.isDev ? 'http' : 'https')
    .setBasePath(prefix)
    .addTag('operator')
    .addTag('user')
    .addTag('auth')
    .addBearerAuth('Authorization', 'header')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  const swaggerDir = `${prefix}/docs`;
  const swaggerJson = `${swaggerDir}/swagger.json`;
  const swaggerUrl = `${hostDomain}/${swaggerJson}`;

  app.use(swaggerJson, (req, res) => {
    res.send(swaggerDoc);
  });

  SwaggerModule.setup(swaggerDir, app, swaggerDoc, {
    swaggerUrl,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true
    }
  });

  app.setGlobalPrefix(prefix);
  await app.listen(port);

  Logger.log(`Server running on ${hostDomain}`, 'bootstrap');
}

bootstrap();
