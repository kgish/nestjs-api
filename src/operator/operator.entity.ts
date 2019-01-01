import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { BaseEntity } from '../common/base.entity';

@Entity('operator')
export class OperatorEntity extends BaseEntity {
  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(type => UserEntity, user => user.operator)
  users: UserEntity[];
}
