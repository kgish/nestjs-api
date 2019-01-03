import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { OperatorEntity } from '../operator/operator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OperatorEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {
}
