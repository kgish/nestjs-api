import { JwtService } from '@nestjs/jwt';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';

import { UserRO } from './interfaces';
import { OperatorEntity } from '../operator/operator.entity';
import { BaseEntity } from '../common/base.entity';

// import { ConfigService } from 'nestjs-config';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { AuthService } from '../common/auth/auth.service';
// import { JwtPayload } from '../common/auth/interfaces/jwt-payload.interface';
import { UserRole } from './interfaces/user-role.enum';

@Entity('user')
export class UserEntity extends BaseEntity {

  private logger: Logger;

  constructor(private readonly authService: AuthService,
              private readonly jwtService: JwtService ) {
    super();
    this.logger = new Logger('UserEntity');
  }

  // constructor(private config: ConfigService) {
  //   super();
  // }

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column()
  role: UserRole;

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
    return await compare(attempt, this.password);
  }

  private get token(): string {
    const { id, username, role } = this;
    const result = this.jwtService.sign({ username, role });
    this.logger.log(`get token: id='${id}', username='${username}', role='${role}' => '${result}'`);
    return result;
  }

  static get modelName(): string {
    return 'User';
  }
}
