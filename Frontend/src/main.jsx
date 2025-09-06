import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./state/Store.js";
import { Auth0Provider } from "@auth0/auth0-react";
const domain = import.meta.env.VITE_DOMAIN;
const clientid = import.meta.env.VITE_CLIENTID;
const audience = import.meta.env.VITE_AUDIENCE;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <Auth0Provider
        domain={domain}
        clientId={clientid}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: "openid profile email",
        }}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);
