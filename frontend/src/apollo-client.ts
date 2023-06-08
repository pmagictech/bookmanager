import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, ServerError, concat } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL });

const logoutLink = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === 401){
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY || "");
    if(location.pathname != "/")
      location.href = "/";
    console.log("🚀 ~ file: apollo-client.ts:10 ~ logoutLink ~ location.href:", location);
  }
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      token: localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || ""),
    },
  }));

  const res = forward(operation);

  return res.map((data) => {
    const token = data.extensions?.token;

    if (token && process.env.NEXT_PUBLIC_TOKEN_KEY)
      localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_KEY, token);

    return data;
  });
});

const client = new ApolloClient({
  link: concat(authMiddleware, logoutLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;
