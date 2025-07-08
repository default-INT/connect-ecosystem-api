export interface Entity {
  _id: string;
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  isDeleted: boolean
}

export type CreateEntity<T extends Entity> = Omit<T,
  | '_id'
  | 'createdAt'
  | 'deletedAt'
  | 'updatedAt'
  | 'isDeleted'
>
export type UpdateEntity<T extends Entity> = { _id: T['_id'] } & Partial<Omit<T, '_id'>>
