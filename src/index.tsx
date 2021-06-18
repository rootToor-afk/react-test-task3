import * as React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const API_URI = "https://countries.trevorblades.com";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: API_URI,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App  />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("main")
);
