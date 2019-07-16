import { graphiqlExpress } from 'apollo-server-express';

const x = graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:3000/subscriptions`
});

export function get(request, response) {
  console.log('graphiql:get');
  return x(request, response);
}
