import { JwtService } from '@nestjs/jwt';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
// import { sign } from 'jsonwebtoken';

import { UserRO, Role } from './interfaces';
import { OperatorEntity } from '../operator/operator.entity';
import { BaseEntity } from '../common/base.entity';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { JwtPayload } from '../common/auth/interfaces/jwt-payload.interface';

@Entity('user')
export class UserEntity extends BaseEntity {

  private logger: Logger;

  // constructor(private config: ConfigService) {
  //   super();
  // }

  constructor(private readonly jwtService: JwtService) {
    super();
    this.logger = new Logger('UsertEntity');
    this.logger.log('constructor()');
  }

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column()
  role: Role;

  @ManyToOne(type => OperatorEntity, operator => operator.users)
  operator: OperatorEntity;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = false): UserRO {
    const { id, created, updated, username, role, token } = this;
    const userRO: UserRO = { id, created, updated, username, role };
    if (showToken) {
      userRO.token = token;
    }
    return userRO;
  }

  async comparePassword(attempt: string) {
    const result = await compare(attempt, this.password);
    return result;
  }

  private get token() {
    const { username, role } = this;
    const payload: JwtPayload = { username, role };
    const result = this.jwtService.sign(payload);
    this.logger.log(`get token: payload='${JSON.stringify(payload)}' => '${result}'`);
    return result;
  }

  static get modelName(): string {
    return 'User';
  }
}
