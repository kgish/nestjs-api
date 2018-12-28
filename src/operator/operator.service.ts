import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperatorDto } from './dto/operator.dto';
import { OperatorEntity } from './operator.entity';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class OperatorService {

  constructor(
    @InjectRepository(OperatorEntity)
    private operatorRepository: Repository<OperatorEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) {
  }

  async create(data: OperatorDto): Promise<OperatorEntity> {
    const operator = await this.operatorRepository.create(data);
    await this.operatorRepository.save(operator);
    return operator;
  }

  async findAll(): Promise<OperatorEntity[]> {
    return await this.operatorRepository.find({ relations: ['users']});
  }

  async findOne(id: string): Promise<OperatorEntity> {
    const operator = await this.operatorRepository.findOne({ where: { id }, relations: ['users'] });
    if (!operator) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return operator;
  }

  async update(id: string, data: Partial<OperatorDto>): Promise<OperatorEntity> {
    let operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.operatorRepository.update({ id }, data);
    operator = await this.operatorRepository.findOne({ where: { id } });
    return operator;
  }

  async delete(id: string): Promise<any> {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.operatorRepository.delete({ id });
    return operator;
  }
}
