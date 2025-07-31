import * as crypto from 'node:crypto';

export const generateReqId = () => crypto.randomBytes(10).toString('hex')
