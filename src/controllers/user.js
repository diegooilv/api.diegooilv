import { createUser, getUser, getUsers } from "../services/user.js";

export const getUserController = async (req, res, next) => {
  const response = await getUsers();
  res.status(response.status || 200).json(response);
};

export const createUserController = async (req, res, next) => {
  const { nome, email, idade } = req.body;
  const response = await createUser(nome, email, idade);
  res.status(response.status).json({
    message: response.message,
    ...(response.usuario && { usuario: response.usuario }),
  });
};

