import { Router } from "express";
import { validateParams } from "../middlewares/validateParams.js";
import {
  getClimaAtualController,
  getPrevisaoClimaController,
  getPrevisao12hClimaController,
  getLatLonController,
} from "../controllers/clima.js";

const router = Router();

router.get("/:cidade", validateParams(["cidade"]), getClimaAtualController);
router.get(
  "/previsao/:cidade",
  validateParams(["cidade"]),
  getPrevisaoClimaController
);
router.get(
  "/previsao/12h/:cidade",
  validateParams(["cidade"]),
  getPrevisao12hClimaController
);
router.get("/latlon/:cidade", validateParams(["cidade"]), getLatLonController);

export default router;
