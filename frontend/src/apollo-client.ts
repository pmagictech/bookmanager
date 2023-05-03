import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ServerError } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const logoutLink = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === 401)
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "");
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || ""),
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, logoutLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
