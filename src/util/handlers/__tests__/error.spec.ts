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
    const response = ErrorHandler({} as any);
    expect(response).toEqual({
      ...defaultError,
      body: JSON.stringify(defaultError.body),
    });
  });
  it('should call cb with the options passed in', () => {
    const response = ErrorHandler({
      description: 'Authentication Required',
      error: new Error('Forbidden'),
      status: 403,
    } as any);
    expect(response).toEqual({
      ...defaultError,
      body: JSON.stringify({
        description: 'Authentication Required',
        error: new Error('Forbidden'),
      }),
      statusCode: 403,
    });
  });
});
