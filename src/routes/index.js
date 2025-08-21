import { Router } from "express";
import usersRouter from "./users.router.js";
import appRouter from "./app.router.js";
import testeRouter from "./teste.router.js";
import pokemonRouter from "./pokemon.router.js";
import climaRouter from "./clima.router.js";
import userJavaRouter from "./userJava.router.js";
import pessoaJavaRouter from "./pessoaJava.router.js";
import iaRouter from "./ia.router.js";

const router = Router();

router.use("/teste", testeRouter);
router.use("/users", usersRouter);
router.use("/app", appRouter);
router.use("/dex", pokemonRouter);
router.use("/clima", climaRouter);
router.use("/userJava", userJavaRouter);
router.use("/pessoaJava", pessoaJavaRouter);
router.use("/ia", iaRouter);

export default router;
