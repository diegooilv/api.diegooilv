import { Router } from "express";
import usersRouter from "./users.router.js";
import tabelaRouter from "./tabela.router.js";
import testeRouter from "./teste.router.js"

const router = Router();

router.use("/teste", testeRouter)
router.use("/users", usersRouter);
router.use("/tabela", tabelaRouter);

export default router;
