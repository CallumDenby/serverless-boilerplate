import { APIGatewayProxyEvent } from 'aws-lambda';
import WrapHandler, { Handler } from '../../util/handlers';

const Echo: Handler<APIGatewayProxyEvent> = async ({ event, context }) => {
  return {
    body: JSON.stringify({ event, context }, null, 2),
  };
};

export default WrapHandler(Echo);
