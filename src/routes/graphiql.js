import { graphiqlExpress } from 'apollo-server-express';

export const get = graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
});
