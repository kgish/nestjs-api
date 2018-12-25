import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OperatorModule } from './operator/operator.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

import 'dotenv/config';

const port = +process.env.DB_PORT || 5432;
const host = process.env.DB_HOST || 'localhost';
const username = process.env.DB_USERNAME || 'nestjs';
const password = process.env.DB_PASSWORD || 'nestjs';
const database = process.env.DB_DATABASE || 'nestjs';
const synchronize = process.env.DB_SYNCHRONIZE === 'true';
const logging = process.env.DB_LOGGING === 'true';

@Module({
  imports: [
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
