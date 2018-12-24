import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';
import { OperatorEntity } from './operator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperatorEntity])],
  controllers: [OperatorController],
  providers: [OperatorService]
})
export class OperatorModule {}
