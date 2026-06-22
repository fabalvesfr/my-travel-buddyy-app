import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const GRAPHQL_ENDPOINT = "http://localhost:4000/";

const cache = new InMemoryCache();
const link = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
