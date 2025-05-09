import { Router } from "express";
import { validKey } from "../middlewares/validKey.js";
import { getUserController, createUserController } from "../controllers/user.js";
const router = Router();

router.post("/buscar", validKey, getUserController);
router.post("/criar", validKey, createUserController);
export default router;
