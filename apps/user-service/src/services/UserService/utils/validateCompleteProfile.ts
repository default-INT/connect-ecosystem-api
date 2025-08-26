import * as Yup from 'yup'

export const validateCompleteProfile = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required(),
})
