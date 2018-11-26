import RequestHandler, {
  ErrorHandler,
  SuccessHandler,
} from '../request-handler';

jest.mock('../logger/logger.ts', () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

describe('Request Handler', () => {
  it('should expose a WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn());
    expect(Wrapper.WrappedHandler).toBeDefined();
  });
  it('should call the WrappedHandler when invoked', () => {
    const Wrapper = RequestHandler(jest.fn());
    Wrapper(undefined, undefined, undefined);
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1);
    expect(Wrapper.WrappedHandler).toHaveBeenLastCalledWith(
      undefined,
      undefined,
      {
        error: expect.any(Function),
        success: expect.any(Function),
      },
    );
  });
  it('should pass variables through to the WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn());
    const event = {
      event: true,
    };
    const context = {
      context: true,
    };
    const cb = jest.fn();
    Wrapper(event, context, cb);
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1);
    expect(Wrapper.WrappedHandler).toHaveBeenLastCalledWith(event, context, {
      error: expect.any(Function),
      success: expect.any(Function),
    });
  });
});

const defaultSuccess = {
  body: '',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: 200,
};

describe('Success Handler', () => {
  it('should call cb with defaults', () => {
    const cb = jest.fn();
    SuccessHandler(cb)({} as any);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith(null, defaultSuccess);
  });
  it('should stringify the body object', () => {
    const cb = jest.fn();
    const body = {
      no: false,
      yes: true,
    };
    SuccessHandler(cb)({ body } as any);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultSuccess,
      body: JSON.stringify(body),
    });
  });
  it('should call cb with the options passed in', () => {
    const cb = jest.fn();
    const body = {
      no: true,
      yes: false,
    };
    SuccessHandler(cb)({ body, status: 201 } as any);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultSuccess,
      body: JSON.stringify(body),
      statusCode: 201,
    });
  });
});

const defaultError = {
  body: {
    description: '',
    error: null,
  },
  headers: {},
  statusCode: 501,
};

describe('Error Handler', () => {
  it('should call cb with defaults', () => {
    const cb = jest.fn();
    ErrorHandler(cb)({} as any);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultError,
      body: JSON.stringify(defaultError.body),
    });
  });
  it('should call cb with the options passed in', () => {
    const cb = jest.fn();
    ErrorHandler(cb)({
      description: 'Authentication Required',
      error: new Error('Forbidden'),
      status: 403,
    } as any);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultError,
      body: JSON.stringify({
        description: 'Authentication Required',
        error: new Error('Forbidden'),
      }),
      statusCode: 403,
    });
  });
});
