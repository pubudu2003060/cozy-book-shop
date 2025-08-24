import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://localhost:5000",
  issuerBaseURL: "https://dev-zg2zh4fjwx56n2jo.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default jwtCheck;
