import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./style/index.css";

// React Redux
import { Provider } from 'react-redux'
import store from './store'

// Focus React Context Provider
import { MaterialUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
