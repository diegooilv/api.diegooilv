import { Router } from "express";
import { validKey } from "../middlewares/validKey.js";
import { getTabelaController } from "../controllers/tabela.js";

const router = Router();

router.post("/buscar", validKey, getTabelaController);

export default router;
