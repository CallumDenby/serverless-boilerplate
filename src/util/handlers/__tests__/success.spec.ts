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
    const response = SuccessHandler({} as any);
    expect(response).toEqual(defaultSuccess);
  });
  it('should stringify the body object', () => {
    const body = {
      no: false,
      yes: true,
    };
    const response = SuccessHandler({ body } as any);
    expect(response).toEqual({
      ...defaultSuccess,
      body: JSON.stringify(body),
    });
  });
  it('should call cb with the options passed in', () => {
    const body = {
      no: true,
      yes: false,
    };
    const response = SuccessHandler({ body, status: 201 } as any);
    expect(response).toEqual({
      ...defaultSuccess,
      body: JSON.stringify(body),
      statusCode: 201,
    });
  });
});
