# Courier RedwoodJS Raffle App

## Prerequisites

 - Redwood requires [Node.js](https://nodejs.org/en/) (=18.x) and [Yarn](https://yarnpkg.com/) (>=1.15)
 - Are you on Windows? For best results, follow our [Windows development setup](https://redwoodjs.com/docs/how-to/windows-development-setup) guide

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

```PUBLIC_COURIER_USER=xxx
PUBLIC_COURIER_CLIENT_KEY=yyy
COURIER_LIST_ID=zzz
COURIER_AUTH_TOKEN=pk_xxx
WEBHOOK_SECRET=yyy```

### `PUBLIC_COURIER_USER`

TBD

### `PUBLIC_COURIER_CLIENT_KEY`

TBD

### `COURIER_LIST_ID`

TBD

### `COURIER_AUTH_TOKEN`

TBD

### `WEBHOOK_SECRET`

TBD

## Deploying

This app is currently configured to deploy to Netlify, but you can find a full list of supported deployment targets here:

https://redwoodjs.com/docs/deployment/index