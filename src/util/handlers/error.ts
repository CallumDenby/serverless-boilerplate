import log from '../logger/logger';

interface IError {
  description?: any;
  error?: Error;
  headers?: { [key: string]: string };
  status?: number;
}

export const ErrorHandler = (cb) => ({
  description = '',
  error = null,
  status = 501,
  headers = {},
}: IError) => {
  const response = {
    body: JSON.stringify({
      description,
      error,
    }),
    headers,
    statusCode: status,
  };
  log.error({
    ...response,
    body: {
      description,
      error,
    },
  });
  cb(null, response);
};
