import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserRO, User, UserRole } from './interfaces';
import { UserRegisterDto, UserLoginDto } from './dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) {
  }

  async findAll(): Promise<UserRO[]> {
    const users = await this.userRepository.find({ relations: ['operator'] });
    return users.map(user => user.toResponseObject());
  }

  async findOne(id: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['operator'] });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject();
  }

  async findOneUsername(username: string): Promise<UserRO> {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['operator'] });
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return user.toResponseObject();
  }

  async register(data: UserRegisterDto): Promise<UserRO> {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const createData: User = {
      username: data.username,
      password: data.password,
      role: UserRole.user
    };

    user = await this.userRepository.create(createData);
    await this.userRepository.save(user);

    return user.toResponseObject(true);
  }

  async login(data: UserLoginDto): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user || (!await user.comparePassword(password))) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject(true);
  }
}
