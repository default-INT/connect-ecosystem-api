import * as Yup from 'yup';

export const baseEntitySchema = Yup.object().shape({
  _id: Yup.string().required(),
  createdAt: Yup.string().required(),
  updatedAt: Yup.string().required(),
})

export type BaseEntityDto = Yup.Asserts<typeof baseEntitySchema>
