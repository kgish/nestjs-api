import { Logger, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperatorModule } from './operator/operator.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { UserModule } from './user/user.module';
import { ConfigModule } from 'nestjs-config';

import * as path from 'path';
import * as fs from 'fs';
import 'dotenv/config';

const port = +process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'nestjs';
const password = process.env.DB_PASSWORD || 'nestjs';
const database = process.env.DB_DATABASE || 'nestjs';
const synchronize = process.env.DB_SYNCHRONIZE ? process.env.DB_SYNCHRONIZE === 'true' : true;
const logging = process.env.DB_LOGGING ? process.env.DB_LOGGING === 'true' : true;

if (fs.existsSync(path.resolve(__dirname, '.env'))) {
  Logger.log('Found .env', 'AppModule');
} else {
  Logger.warn('WARNING: Cannot find .env', 'AppModule');
}
Logger.log(`${JSON.stringify({port, host, username, database, synchronize, logging})}`, 'AppModule');

@Module({
  imports: [
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
}
