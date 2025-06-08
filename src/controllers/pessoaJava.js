import { getAllUsers, createUser, updateUser, loginUser } from "../services/pessoaJava.js";

export const getAllUsersController = async (req, res, next) => {
  const resultado = await getAllUsers();
  return res.status(resultado.status).json(resultado.resultado);
};

export const createUserController = async (req, res, next) => {
  const { nome, email, senha, endereco } = req.body;
  const resultado = await createUser(nome, email, senha, endereco);
  return res.status(resultado.status).json(resultado);
};

export const updateUserController = async (req, res, next) => {
  const { id, nome, email, senha, endereco } = req.body;
  const resultado = await updateUser(id, nome, email, senha, endereco);
  return res.status(resultado.status).json(resultado);
};


export const loginUserController = async (req, res, next) => {
    const {email, senha} = req.body;
    const resultado = await loginUser(email, senha);
    return res.status(resultado.status).json(resultado);
}