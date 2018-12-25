import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperatorDto } from './dto/operator.dto';
import { OperatorEntity } from './operator.entity';

@Injectable()
export class OperatorService {

  constructor(@InjectRepository(OperatorEntity) private operatorRepository: Repository<OperatorEntity>) {
  }

  async create(data: OperatorDto) {
    const operator = await this.operatorRepository.create(data);
    await this.operatorRepository.save(operator);
    return operator;
  }

  async findAll(): Promise<OperatorEntity[]> {
    return await this.operatorRepository.find();
  }

  async findOne(id: string): Promise<OperatorEntity> {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return operator;
  }

  async update(id: string, data: Partial<OperatorDto>): Promise<OperatorEntity> {
    const operator = await this.operatorRepository.findOne({ where: { id } });
    if (!operator) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.operatorRepository.update({ id }, data);
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
