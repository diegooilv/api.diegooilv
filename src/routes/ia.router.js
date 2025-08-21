import { Router } from "express";

import { validateBodyFields } from "../middlewares/validateBodyFields.js";

import { iaController, modelsController } from "../controllers/ia.js";

const router = Router();

router.post("/", validateBodyFields(["prompt", "model"]), iaController);
router.get("/models", modelsController);

export default router;
