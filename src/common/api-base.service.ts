import { ApiBaseEntity } from './api-base.entity';
import { Repository } from 'typeorm';

export class ApiBaseService<T extends ApiBaseEntity> {

  constructor(
    public repository: Repository<T>,
  ) {
  }

  // async create(item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this.repository.create(item);
  // }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(): Promise<T> {
    return this.repository.findOne();
  }

  // async findById(id: string): Promise<T> {
  //   return this.repository.findById(this.toObjectId(id)).exec();
  // }
  //
  // async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this.repository.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
  // }
  //
  // async delete(id: string): Promise<InstanceType<T>> {
  //   return this.repository.findByIdAndRemove(this.toObjectId(id)).exec();
  // }

}
