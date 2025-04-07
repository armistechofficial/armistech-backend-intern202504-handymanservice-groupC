import {Router} from "express";
import { getAllProviders } from "../controllers/providerController.js";

const providerRouter = Router();

providerRouter.get("/providers", getAllProviders);

export default providerRouter;