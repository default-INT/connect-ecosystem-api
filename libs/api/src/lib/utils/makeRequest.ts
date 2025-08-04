import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

type Middleware = (config: AxiosRequestConfig) => AxiosRequestConfig;

export const makeRequest = (baseURL: string) => (middlewares: Middleware[]) => {
  const instance = axios.create({
    baseURL,
  })

  return <Response>(config: AxiosRequestConfig = {}): AxiosPromise<Response> => {
    const params: AxiosRequestConfig = middlewares.reduce(
      (acc, middlewareFn) => middlewareFn(acc),
      config,
    );

    return instance.request(params);
  }
}
