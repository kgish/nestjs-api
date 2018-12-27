import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('operator')
export class OperatorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(type => UserEntity, user => user.operator)
  users: UserEntity[];
}
