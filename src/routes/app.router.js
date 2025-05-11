import { Router } from "express";
import { validKey } from "../middlewares/validKey.js";
import { validateBodyFields } from "../middlewares/validateBodyFields.js";
import {
  getTabelaController,
  signup,
  login,
  showData,
} from "../controllers/app.js";
import { verifyAuthToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/buscar", validKey, getTabelaController);
router.post(
  "/signup",
  validateBodyFields(["name", "email", "plainPassword"]),
  signup
);
router.post("/login", validateBodyFields(["email", "password"]), login);
router.post("/", verifyAuthToken, showData);
export default router;
