import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./style/index.css";

// React Redux
import { Provider } from 'react-redux'
import store from './store'

// Focus React Context Provider
import { MaterialUIControllerProvider } from "context";

// Apollo client for graphQL
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
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
