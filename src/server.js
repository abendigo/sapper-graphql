import sirv from 'sirv';
// import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

import http from 'http';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

// import bodyParser from 'body-parser';

import { schema } from './_schema';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express() // You can also use Express
  // .use( bodyParser.json() )
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware()
	);

const server = http.createServer(app);

server.listen(PORT, () => {
  // console.log("Server started listening on " + PORT);
  // httpServer.listen({ port: PORT }, () => {
      // console.log(`server ready at http://localhost:${PORT}${apollo.graphqlPath}`)
      // console.log(`Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`)
  //   })
  const subs = new SubscriptionServer({
    execute,
    subscribe,
    schema: schema,
  }, {
    server: server,
    path: '/subscriptions'
  });
});
