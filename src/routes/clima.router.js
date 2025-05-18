import { Router } from "express";
import { validateParams } from "../middlewares/validateParams.js";
import { getClimaAtualController } from "../controllers/clima.js";

const router = Router();

router.get('/:cidade', validateParams(['cidade']), getClimaAtualController)

export default router;