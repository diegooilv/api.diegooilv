import { Router } from "express";

import { validateBodyFields } from "../middlewares/validateBodyFields.js";

import { iaGroqController, modelsGroqController } from "../controllers/groq.js";

const router = Router();

router.post("/ia", validateBodyFields(["prompt"]), iaGroqController);
router.get("/models", modelsGroqController);

export default router;