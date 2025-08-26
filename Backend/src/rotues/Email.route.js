import express from "express";
import { sendEmail } from "../controllers/Email.controler.js";

const emailRouter = express.Router();

emailRouter.post("/sendemail", sendEmail);

export default emailRouter;
