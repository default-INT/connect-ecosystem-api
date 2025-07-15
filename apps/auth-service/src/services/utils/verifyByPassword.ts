import bcrypt from 'bcrypt'
import { BadRequest400Error } from '@connect-ecosystem-api/shared';
import { Credentials, InvalidIdentifierError, InvalidPasswordError, LoginRequestDto } from '../../model';

export const verifyByPassword = async (credentials: Credentials, loginData: LoginRequestDto) => {
  if (!loginData.password) throw new BadRequest400Error('Password is required');
  if (!credentials.hash) throw new InvalidIdentifierError(loginData.authType)

  const isValid = await bcrypt.compare(loginData.password, credentials.hash)

  if (!isValid) throw new InvalidPasswordError()

  return isValid
}
