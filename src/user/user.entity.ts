import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UserRO, Role } from './interfaces';
import { OperatorEntity } from '../operator/operator.entity';
import { BaseEntity } from '../common/base.entity';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

@Entity('user')
export class UserEntity extends BaseEntity {

  private logger: Logger;

  // constructor(private config: ConfigService) {
  //   super();
  // }

  constructor() {
    super();
    this.logger = new Logger('UsertEntity');
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
    const { id, username, role } = this;
    const secret = process.env.JWT_SECRET || 'jwtsecret12345!';
    const expiresIn = process.env.JWT_EXPIRES || '30m';
    this.logger.log(`get token: id='${id}', username='${username}', role='${role}', secret='${secret}', expiresIn='${expiresIn}'`);
    return sign({
      id, username, role,
    }, secret, { expiresIn });
    // }, this.config.get('jwt.secret'), { expiresIn: this.config.get('jwt.expires') });
  }

  static get modelName(): string {
    return 'User';
  }
}
