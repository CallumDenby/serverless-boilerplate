import { APIGatewayProxyEvent } from 'aws-lambda';
import { say } from 'cowsay';
import WrapHandler, { Handler } from '../../util/handlers';

const Echo: Handler<APIGatewayProxyEvent> = async () => {
  return {
    body: say({ text: 'Hello World' }),
  };
};

export default WrapHandler(Echo);
