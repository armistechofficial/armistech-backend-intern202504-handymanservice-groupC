import {Router} from "express";
import { getAllProviders, createProviders } from "../controllers/providerController.js";

const providerRouter = Router();

providerRouter.get("/providers", getAllProviders);
providerRouter.post("/providers", createProviders);

export default providerRouter;