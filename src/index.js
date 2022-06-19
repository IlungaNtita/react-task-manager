import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./style/index.css";

// React Redux
import { Provider } from 'react-redux'
import store from './store'

// Clocked React Context Provider
import { MaterialUIControllerProvider } from "context";

// Apollo client for graphQL
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';
import { AUTH_TOKEN } from "constants";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MaterialUIControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MaterialUIControllerProvider>
    </BrowserRouter>
  </ApolloProvider>
);
