import { Router } from "express";

import { validateBodyFields } from "../middlewares/validateBodyFields.js";

import { iaController } from "../controllers/ia.js";

const router = Router();

router.post("/", validateBodyFields(["prompt"]), iaController);

export default router;
