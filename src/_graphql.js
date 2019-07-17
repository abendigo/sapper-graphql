import { ApolloClient, ObservableQuery } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';


export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql'
  });
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/subscriptions`,
    options: {
      reconnect: true
    }
  });


  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );
      // const client = new ApolloClient({
      //   uri: "http://localhost:3000/graphql"
      // });



  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.map(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      link
      // new HttpLink({
      //   uri: 'http://localhost:3000/graphql',
      //   credentials: 'same-origin'
      // })
    ]),
    cache: new InMemoryCache()
  });

  return client;
}
