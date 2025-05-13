import { Router } from "express";
import usersRouter from "./users.router.js";
import appRouter from "./app.router.js";
import testeRouter from "./teste.router.js";
import pokemonRouter from "./pokemon.router.js"

const router = Router();

router.use("/teste", testeRouter);
router.use("/users", usersRouter);
router.use("/app", appRouter);
router.use("/dex", pokemonRouter)

export default router;
