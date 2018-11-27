import { ErrorHandler } from '../error';

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
