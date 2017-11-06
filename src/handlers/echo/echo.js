import RequestWrapper, { Handler } from '../../lib/request-handler'

@RequestWrapper
export default class Echo extends Handler {
  run (event, context, { success }) {
    success({
      body: JSON.stringify(event, null, 2)
    })
  }
}
