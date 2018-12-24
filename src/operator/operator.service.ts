import { Injectable } from '@nestjs/common';
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
    return await this.operatorRepository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<OperatorDto>): Promise<OperatorEntity> {
    await this.operatorRepository.update({ id }, data);
    return await this.operatorRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<any> {
    await this.operatorRepository.delete({ id });
    return { deleted: true };
  }
}
