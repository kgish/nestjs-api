import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'nestjs-config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './common/auth/auth.module';
import { OperatorModule } from './operator/operator.module';
import { UserModule } from './user/user.module';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

import * as path from 'path';
import * as fs from 'fs';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';

const port = +process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'nestjs';
const password = process.env.DB_PASSWORD || 'nestjs';
const database = process.env.DB_DATABASE || 'nestjs';
const synchronize = process.env.DB_SYNCHRONIZE ? process.env.DB_SYNCHRONIZE === 'true' : true;
const logging = process.env.DB_LOGGING ? process.env.DB_LOGGING === 'true' : true;

@Module({
  imports: [
    AuthModule,
    ConfigModule.load(
      path.resolve(__dirname, 'config/**/*.{ts,js}'),
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize,
      logging,
    }),
    OperatorModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  static host: string;
  static port: number;
  static prefix: string;
  static environment: string;
  static isDev: boolean;

  constructor() {
    const logger = new Logger('AppModule');
    const dotenv = path.resolve(__dirname, '..', '.env');

    AppModule.host = process.env.API_HOST || 'localhost';
    AppModule.port = +process.env.API_PORT || 3000;
    AppModule.prefix = process.env.API_PREFIX || 'api/v1';
    AppModule.environment = process.env.NODE_ENV || 'development';
    AppModule.isDev = AppModule.environment === 'development';

    logger.log(`API => ${JSON.stringify({
      host: AppModule.host,
      port: AppModule.port,
      prefix: AppModule.prefix,
      environment: AppModule.environment,
      isDev: AppModule.isDev,
    })}`);

    if (fs.existsSync(dotenv)) {
      logger.log(`Found .env at ${dotenv}`);
    } else {
      logger.warn(`WARNING: Cannot find .env at ${dotenv}`);
    }

    logger.log(`Database => ${JSON.stringify({ port, host, username, database, synchronize, logging })}`);

  }
}
