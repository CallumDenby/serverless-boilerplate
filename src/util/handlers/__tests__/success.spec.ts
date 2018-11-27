import { SuccessHandler } from '../success';

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
