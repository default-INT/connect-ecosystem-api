import { AxiosRequestConfig } from 'axios';

export const addInternalHeader = (config: AxiosRequestConfig): AxiosRequestConfig => ({
  ...config,
  headers: {
    ...config.headers,
    'X-Internal-Request': 'true',
  },
});
