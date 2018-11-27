import RequestHandler from '../index';

describe('Request Handler', () => {
  it('should expose a WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn());
    expect(Wrapper.WrappedHandler).toBeDefined();
  });
  it('should call the WrappedHandler when invoked', () => {
    const Wrapper = RequestHandler(jest.fn());
    Wrapper(undefined, undefined, undefined);
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1);
    expect(Wrapper.WrappedHandler).toHaveBeenLastCalledWith({
      context: undefined,
      event: undefined
    });
  });
  it('should pass variables through to the WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn());
    const event = {
      event: true,
    };
    const context = {
      context: {},
    };
    const cb = jest.fn();
    Wrapper(event, context as any, cb);
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1);
    expect(Wrapper.WrappedHandler).toHaveBeenLastCalledWith({
      context,
      event,
    });
  });
});
