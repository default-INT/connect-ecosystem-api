import { Entity, objectIdSchema, UpdateEntity } from '../../model/entities';
import { OptionalUnlessRequiredId } from 'mongodb';
import { DbInvalidIdError } from '../../model/exceptions';

export const prepareToUpdate = <T extends Entity>(entity: UpdateEntity<T>) => {
  const date = (new Date()).toISOString();
  const id = objectIdSchema.cast(entity._id)

  if (!id) throw new DbInvalidIdError(id)

  return {
    ...entity,
    _id: id,
    updatedAt: date,
  } as OptionalUnlessRequiredId<T>
}
