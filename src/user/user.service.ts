import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserRO } from './interfaces/user-ro.interface';
import { OperatorEntity } from '../operator/operator.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OperatorEntity)
    private operatorRepository: Repository<OperatorEntity>) {
  }

  async findAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find({ relations: ['operator'] });
    return users.map(user => user.toResponseObject(false));
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['operator'] });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async login(data: UserDto): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || (!await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
    }
    return user.toResponseObject();
  }

  async register(data: UserDto): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
