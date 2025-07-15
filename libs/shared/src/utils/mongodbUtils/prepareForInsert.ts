import { CreateEntity, Entity } from '../../model';
import { OptionalUnlessRequiredId } from 'mongodb';

export const prepareForInsert = <T extends Entity>(entity: CreateEntity<T>) => {
  const date = (new Date()).toISOString();

  return {
    ...entity,
    createdAt: entity.createdAt || date,
    updatedAt: entity.updatedAt || date,
    deletedAt: null,
    isDeleted: false,
  } as OptionalUnlessRequiredId<T>
}
