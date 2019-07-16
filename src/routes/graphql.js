import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { PubSub } from 'graphql-subscriptions';

const schema = buildSchema(`
  type Query {
    random: Float
  }
  type Subscription {
    randoms: Float
  }
`);


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const root = {
  random: () => Math.random(),
  // // randoms: {
  // //   // subscribe: async function* asyncRandomNumbers() {
  // //   //   while (true) {
  // //   //     yield { random: Math.random() };
  // //   //     await sleep(1000);
  // //   //   }
  // //   // }
  // //   subscribe: () => pubsub.asyncIterator([BOOK_ADDED, BOOK_REMOVED, BOOK_UPDATED])
  // }
}

const foo = graphqlHTTP({
  schema,
  rootValue: root,
  pretty: true
});

export function post(req, res) {
  console.log('graphql.post', req.body)
  return foo(req, res);
}
