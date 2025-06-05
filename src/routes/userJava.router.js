import { Router } from "express";

import { validateBodyFields } from "../middlewares/validateBodyFields.js";

import {
  getUserController,
  createUserController,
} from "../controllers/userJava.js";

import { validateUserJava } from "../middlewares/validateUserJava.js";

const router = Router();
/*  private int id;
    private String nome;
    private String numero;
    private String email;
    private String cpf;
    private String endereco;
*/

router.get("/", getUserController);
router.post(
  "/",
  validateBodyFields(["id", "nome", "numero", "email", "cpf", "endereco"]),
  validateUserJava,
  createUserController
);

export default router;
