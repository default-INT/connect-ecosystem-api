import { AxiosRequestConfig } from 'axios';

export const addDeleteMethod = (config: AxiosRequestConfig): AxiosRequestConfig => ({
  ...config,
  method: 'DELETE',
});
