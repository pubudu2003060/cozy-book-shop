import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./state/Store.js";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <Auth0Provider
        domain="dev-zg2zh4fjwx56n2jo.us.auth0.com"
        clientId="LvWb3PcxYn4hBd75AdyAVFHBUmZAQ30T"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://localhost:5000",
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);
