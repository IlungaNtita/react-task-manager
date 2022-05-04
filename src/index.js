import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "./style/index.css";

// Focus React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
