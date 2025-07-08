import { CreateEntity, Entity, UpdateEntity } from '../entities';

export interface Repository<T extends Entity> {
  findAll(): Promise<T[]>;
  findById(id: T['_id']): Promise<T | null>;
  create(entity: CreateEntity<T>): Promise<boolean>;
  update(item: UpdateEntity<T>): Promise<boolean>;
  delete(id: T['_id']): Promise<boolean>;
  deleteMany(id: T['_id'][]): Promise<boolean>;
}
