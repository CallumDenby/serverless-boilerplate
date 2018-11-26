import log from './logger/logger';

interface ISuccess {
  body: string | object;
  status: number;
  headers: object;
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

export const ErrorHandler = (cb) => ({
  description = '',
  error = null,
  status = 501,
  headers = {},
}) => {
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

export class Handler {
  constructor(event, context, done) {
    this.run(event, context, done);
  }

  public run(_event, _context, { success }) {
    success({
      body: 'Please override the run method',
    });
  }
}

export default (EventHandler: new (event, context, done) => Handler) => {
  function Wrapper(event, context, cb) {
    log.info({ event });
    new EventHandler(event, context, {
      error: ErrorHandler(cb),
      success: SuccessHandler(cb),
    });
  }
  Wrapper.WrappedHandler = EventHandler;
  return Wrapper;
};
