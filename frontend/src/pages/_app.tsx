import { ApolloProvider } from "@apollo/client";
import client from "@src/apollo-client";
import MessageContext from "@src/context/MessageContext";
import "@src/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ApolloProvider client={client}>
      <MessageContext>
          <Component {...pageProps} />
      </MessageContext>
    </ApolloProvider>
  );
}
