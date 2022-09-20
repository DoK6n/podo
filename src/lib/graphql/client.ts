import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

const httpLink = new HttpLink({ uri: `${process.env.REACT_APP_SERVER_URL}/graphql` });
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
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        keyFields: ['id', 'userId'],
      },
    },
  }),
});
