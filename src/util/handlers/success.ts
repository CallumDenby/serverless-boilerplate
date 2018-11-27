import log from '../logger/logger';

export interface ISuccess {
  body?: string | object;
  status?: number;
  headers?: { [key: string]: string };
}

export const SuccessHandler = (cb) => ({
  body = '',
  headers = {},
  status = 200,
}: ISuccess) => {
  const response = {
    body: typeof body === 'object' ? JSON.stringify(body) : body,
    headers: {
      'Access-Control-Allow-Origin': '*',
      ...headers,
    },
    statusCode: status,
  };
  log.info({
    ...response,
    body,
  });
  cb(null, response);
};
