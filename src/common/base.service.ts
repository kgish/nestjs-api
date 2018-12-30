export abstract class BaseService<T> {
  async dummy(): Promise<string> { return 'dummy'; }
  // async findAll(filter = {}): Promise<InstanceType<T>[]> {
  //   return this._model.find(filter).exec();
  // }
  //
  // async findOne(filter = {}): Promise<InstanceType<T>> {
  //   return this._model.findOne(filter).exec();
  // }
  //
  // async findById(id: string): Promise<InstanceType<T>> {
  //   return this._model.findById(this.toObjectId(id)).exec();
  // }
  //
  // async create(item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this._model.create(item);
  // }
  //
  // async delete(id: string): Promise<InstanceType<T>> {
  //   return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
  // }
  //
  // async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
  //   return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
  // }
  //
  // async clearCollection(filter = {}): Promise<void> {
  //   return this._model.deleteMany(filter).exec();
  // }
  //
  // private toObjectId(id: string): Types.ObjectId {
  //   return Types.ObjectId(id);
  // }
}
