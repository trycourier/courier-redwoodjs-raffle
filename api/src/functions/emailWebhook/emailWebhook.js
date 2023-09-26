import { createHash } from 'crypto'

import { CourierClient } from '@trycourier/courier'

import { logger } from 'src/lib/logger'

/**
 * processes inbound Postmark webhook requests
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
  logger.info(`${event.httpMethod} ${event.path}: emailWebhook function`)

  const secret = event?.queryStringParameters?.secret

  if (secret !== process.env.WEBHOOK_SECRET) {
    // return a 403
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Not Authorized',
      }),
    }
  } else {
    // get from email address and subject from Postmark webhook payload
    const params = JSON.parse(event.body)
    const fromEmail = params.From
    const name = params.Subject
    // create a unique id for this user based on their email address
    const userId = createHash('sha3-256').update(fromEmail).digest('hex')
    // create a Profile for this user
    const courier = CourierClient()
    await courier.mergeProfile({
      recipientId: userId,
      profile: {
        email: fromEmail,
        email_verified: true,
        name,
      },
    })
    // Add the user to our List
    await courier.lists.subscribe(process.env.COURIER_LIST_ID, userId)
    // Send an in-app toast and Inbox notification to this website
    await courier.send({
      message: {
        to: {
          user_id: process.env.PUBLIC_COURIER_USER,
        },
        content: {
          body: '{{ name }} has entered the raffle!',
        },
        routing: {
          method: 'single',
          channels: ['inbox'],
        },
        data: {
          name,
        },
      },
    })
    // Send a reply to the user letting them know we've recieved their entry
    await courier.send({
      message: {
        to: {
          user_id: userId,
        },
        content: {
          title: 'Your raffle entry has been recieved! 👍',
          body: 'Thank you for entering the Courier raffle! Check out our developer docs to learn more about how Courier works: [courier.com/docs](https://bit.ly/3JoXobz)',
        },
        channels: {
          email: {
            providers: ['postmark'],
          },
        },
        routing: {
          method: 'single',
          channels: ['email'],
        },
      },
    })

    // return a 200 OK to Postmark
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'OK',
      }),
    }
  }
}
