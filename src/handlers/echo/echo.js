import RequestHandler from '../../lib/request-handler'

const Handler = (event, context, { success }) => {
  success({
    body: JSON.stringify(event, null, 2)
  })
}

export default RequestHandler(Handler)
