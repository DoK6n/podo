import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

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

const appLink = from([authMiddleware, errorLink, httpLink]);

export const client = new ApolloClient({
  link: appLink,
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        keyFields: ['id', 'userId'],
      },
    },
  }),
  connectToDevTools: true,
});
