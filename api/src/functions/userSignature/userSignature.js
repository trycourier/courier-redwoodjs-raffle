import crypto from 'crypto'

import { logger } from 'src/lib/logger'

/**
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: userSignature function`)

  const userSignature = crypto
    .createHmac('sha256', process.env.COURIER_AUTH_TOKEN)
    .update(process.env.PUBLIC_COURIER_USER)
    .digest('hex')

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userSignature,
    }),
  }
}
