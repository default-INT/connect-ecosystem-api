import { makeRequest } from './makeRequest';
import { env } from '../config/env';
import { addPostMethod, addGetMethod, addInternalHeader, addDeleteMethod, addData } from './middlewares';

const getAuthRequest = makeRequest(env.services.auth)
const getUserRequest = makeRequest(env.services.user)

export const request = {
  auth: {
    get: getAuthRequest([addGetMethod, addInternalHeader, addData]),
    post: getAuthRequest([addPostMethod, addInternalHeader]),
  },
  user: {
    get: getUserRequest([addGetMethod, addInternalHeader]),
    post: getUserRequest([addPostMethod, addInternalHeader]),
    delete: getUserRequest([addDeleteMethod, addInternalHeader]),
  },
}
