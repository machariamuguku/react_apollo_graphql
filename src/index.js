import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import ant design default css
import "antd/dist/antd.css";

// utilities for
// apollo client(make requests)
// apollo cache(cache results to avoid reFetching same data)
// apollo link (compose endpoint url)
// apollo provider (provide client to the rest of the components)
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

// compose new client with apollo cache and apollo link
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://swapi.graph.cool/" // the StarWars endpoint
  })
});

ReactDOM.render(
  // wrap app with provider
  // passes client down to all nested components
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
