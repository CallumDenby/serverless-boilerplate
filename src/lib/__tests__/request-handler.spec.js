import RequestHandler, { SuccessHandler, ErrorHandler } from '../request-handler'

jest.mock('../logger/logger.js', () => ({
  info: jest.fn(),
  error: jest.fn()
}))

describe('Request Handler', () => {
  it('should expose a WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn())
    expect(Wrapper.WrappedHandler).toBeDefined()
  })
  it('should call the WrappedHandler when invoked', () => {
    const Wrapper = RequestHandler(jest.fn())
    Wrapper()
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1)
    expect(Wrapper.WrappedHandler)
      .toHaveBeenLastCalledWith(undefined, undefined, {
        success: expect.any(Function),
        error: expect.any(Function)
      })
  })
  it('should pass variables through to the WrappedHandler', () => {
    const Wrapper = RequestHandler(jest.fn())
    const event = {
      event: true
    }
    const context = {
      context: true
    }
    const cb = jest.fn()
    Wrapper(event, context, cb)
    expect(Wrapper.WrappedHandler).toHaveBeenCalledTimes(1)
    expect(Wrapper.WrappedHandler)
      .toHaveBeenLastCalledWith(event, context, {
        success: expect.any(Function),
        error: expect.any(Function)
      })
  })
})

const defaultSuccess = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  body: ''
}

describe('Success Handler', () => {
  it('should call cb with defaults', () => {
    const cb = jest.fn()
    SuccessHandler(cb, {})
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb)
      .toHaveBeenLastCalledWith(null, defaultSuccess)
  })
  it('should stringify the body object', () => {
    const cb = jest.fn()
    const body = {
      yes: true,
      no: false
    }
    SuccessHandler(cb, {
      body
    })
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb)
      .toHaveBeenLastCalledWith(null, {
        ...defaultSuccess,
        body: JSON.stringify(body)
      })
  })
  it('should call cb with the options passed in', () => {
    const cb = jest.fn()
    const body = {
      no: true,
      yes: false
    }
    SuccessHandler(cb, {
      body,
      status: 201
    })
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb)
      .toHaveBeenLastCalledWith(null, {
        ...defaultSuccess,
        statusCode: 201,
        body: JSON.stringify(body)
      })
  })
})

const defaultError = {
  statusCode: 501,
  headers: {},
  body: {
    description: '',
    error: null
  }
}

describe('Error Handler', () => {
  it('should call cb with defaults', () => {
    const cb = jest.fn()
    ErrorHandler(cb, {})
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultError,
      body: JSON.stringify(defaultError.body)
    })
  })
  it('should call cb with the options passed in', () => {
    const cb = jest.fn()
    ErrorHandler(cb, {
      description: 'Authentication Required',
      error: new Error('Forbidden'),
      status: 403
    })
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenLastCalledWith(null, {
      ...defaultError,
      body: JSON.stringify({
        description: 'Authentication Required',
        error: new Error('Forbidden')
      }),
      statusCode: 403
    })
  })
})
