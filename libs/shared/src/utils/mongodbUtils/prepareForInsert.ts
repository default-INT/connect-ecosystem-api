import { CreateEntity, Entity } from '../../model/entities';
import { OptionalUnlessRequiredId } from 'mongodb';

export const prepareForInsert = <T extends Entity>(entity: CreateEntity<T>) => {
  const date = (new Date()).toISOString();

  return {
    ...entity,
    createdAt: date,
    updatedAt: date,
    deletedAt: null,
    isDeleted: false,
  } as OptionalUnlessRequiredId<T>
}
