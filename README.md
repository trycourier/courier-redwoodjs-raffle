# Courier RedwoodJS Raffle App

## Prerequisites

 - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
 - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide
 - A free [Courier](https://courier.com/?utm_source=courier-redwoodjs-raffle&utm_medium=code-template&utm_campaign=devrel-apps) account
 - A [Twilio](https://twilio.com) account
 - A [Postmark](https://postmarkapp.com) account

## Getting Started

Start by installing dependencies:

```
yarn install
```

Then start the development server:

```
yarn redwood dev
```

Your browser should automatically open to [http://localhost:8910](http://localhost:8910) where you'll see the Raffle homepage.

## Configuring the app

You'll need to configure the following environment variables:

```
PUBLIC_COURIER_USER=xxx
PUBLIC_COURIER_CLIENT_KEY=yyy
COURIER_LIST_ID=zzz
COURIER_AUTH_TOKEN=pk_xxx
WEBHOOK_SECRET=yyy
PHONE_NUMBER=zzz
EMAIL_ADDRESS=xxx
```

Log-in to your Courier account, create a [new user](https://app.courier.com/users?create-user=true). This will be the user that we send notifications to. Set `PUBLIC_COURIER_USER` to the user ID.

Next, go to your [API Keys page](https://app.courier.com/settings/api-keys) and copy the "Client Key (Public)" production key. Set `PUBLIC_COURIER_CLIENT_KEY` to this value.

On the same API Keys page, under "Production Keys", copy the "Published" key and use it to set `COURIER_AUTH_TOKEN`.

Set `COURIER_LIST_ID` to a unique ID to represent the list of people who are going to enter your raffle. Something like `my_cool_event`.

Set `WEBHOOK_SECRET` to a value that we will use to lock down the webhook requests from Twilio and Postmark. Treat it like a password and make sure it isn't easy to crack.

Set `PHONE_NUMBER` to the Twilio-powered phone number that you are using for the raffle.

Set `EMAIL_ADDRESS` to the email address that you have configured Postmark to recieve email on.

## Deploying

This app is currently configured to deploy to Netlify, but you can find a full list of supported deployment targets here:

https://redwoodjs.com/docs/deployment/index

## Configuring Twilio

In your Twilio account, go to the phone number you are using for the raffle. Under "Messaging Configuration", point the inbound webhook to your deployed app with the secret that you've defined appended as a query parameter. It should look like this:

`https://silly-generated-name-9ee3dc.netlify.app/.netlify/functions/smsWebhook?secret=a-very-strong-password`

## Configuring Postmark

In your Postmark account, under "Deafult Inbound Stream" and "Settings", find the "Webhook" section. Set this webhook to:

`https://silly-generated-name-9ee3dc.netlify.app/.netlify/functions/emailWebhook?secret=a-very-strong-password`

## Getting Help

Running into an issue getting this working? Need some help? Pop over to [our Discord](https://discord.com/invite/courier) and let us know!
