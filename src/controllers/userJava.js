/*  private int id;
    private String nome;
    private String numero;
    private String email;
    private String cpf;
    private String endereco;
*/

import { getAllUsers, createUser } from "../services/userJava.js";

export const getUserController = async (req, res, next) => {
  const response = await getAllUsers();
  res.status(response.status || 200).json(response);
};

export const createUserController = async (req, res, next) => {
  const { id, nome, numero, email, cpf, endereco } = req.body;
  const response = await createUser(id, nome, numero, email, cpf, endereco);
  res.status(response.status || 200).json(response || "");
};
