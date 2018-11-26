import RequestWrapper, { Handler } from '../../lib/request-handler';

class Echo extends Handler {
  public run(event, _, { success }) {
    success({
      body: JSON.stringify(event, null, 2),
    });
  }
}

export default RequestWrapper(Echo);
