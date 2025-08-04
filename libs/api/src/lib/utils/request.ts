import { makeRequest } from './makeRequest';
import { env } from '../config/env';
import { addPostMethod, addGetMethod, addInternalHeader } from './middlewares';

const getAuthRequest = makeRequest(env.services.auth)
const getUserRequest = makeRequest(env.services.auth)

export const request = {
  auth: {
    get: getAuthRequest([addGetMethod, addInternalHeader]),
    post: getAuthRequest([addPostMethod, addInternalHeader]),
  },
  user: {
    get: getUserRequest([addGetMethod, addInternalHeader]),
    post: getUserRequest([addPostMethod, addInternalHeader]),
  },
}
