import { createHash } from 'crypto'

import { CourierClient } from '@trycourier/courier'

import { logger } from 'src/lib/logger'

/**
 * processes inbound Twilio webhook requests
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation, function, and execution environment.
 */
export const handler = async (event, _context) => {
  logger.info(`${event.httpMethod} ${event.path}: smsWebhook function`)

  // get values from the POST
  const params = new URLSearchParams(event.body)
  const phoneNumber = params.get('From')
  const name = params.get('Body')
  // create a unique id for this user based on their phone number
  const userId = createHash('sha3-256').update(phoneNumber).digest('hex')
  // create a Profile for this user
  const courier = CourierClient()
  await courier.mergeProfile({
    recipientId: userId,
    profile: {
      phone_number: phoneNumber,
      phone_number_verified: true,
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
        body: 'Thank you for entering the Courier raffle! Check out our developer docs to learn more about how Courier works: https://courier.com/docs',
      },
      routing: {
        method: 'single',
        channels: ['sms'],
      },
    },
  })

  // return a 200 OK to Twilio
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: `OK`,
    }),
  }
}
