import { Router } from "express";
import { validateBodyFields } from "../middlewares/validateBodyFields.js";

import {
  getAllUsersController,
  createUserController,
  updateUserController,
  loginUserController,
} from "../controllers/pessoaJava.js";

const router = Router();

router.get("/", getAllUsersController);

router.post(
  "/create",
  validateBodyFields(["nome", "email", "senha", "endereco"]),
  createUserController
);

router.post("/update", validateBodyFields(["id"]), updateUserController);

router.post(
  "/login",
  validateBodyFields(["email", "senha"]),
  loginUserController
);

export default router;
