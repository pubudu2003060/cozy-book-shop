import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

const jwtCheck = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUREBASEURL,
  tokenSigningAlg: process.env.TOKENSIGNINALG,
});

export default jwtCheck;
