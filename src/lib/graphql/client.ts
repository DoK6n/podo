import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        keyFields: ['id', 'userId'],
      },
    },
  }),
  link: concat(authMiddleware, httpLink),
});
