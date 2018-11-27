import { Context } from 'aws-lambda';
import log from '../logger/logger';
import { ErrorHandler } from './error';
import { ISuccess, SuccessHandler } from './success';

export interface IPayload<T> {
  event: T,
  context: Context,
}

export type Handler<T> = (arg: IPayload<T>) => Promise<ISuccess>;

export default <T>(EventHandler: Handler<T>) => {
  async function Wrapper(event: T, context: Context, cb: (error, response) => void) {
    log.info({ event });
    try {
      const response = await EventHandler({ context, event })
      return SuccessHandler(cb)(response);
    } catch(error) {
      return ErrorHandler(cb)(error);
    }
  }
  Wrapper.WrappedHandler = EventHandler;
  return Wrapper;
};
