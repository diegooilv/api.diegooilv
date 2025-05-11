import { mdb } from "../config/db.js";
import users from "../models/pg/user.js";

export const getTabela = async () => {
  try {
    const resultado = await mdb.select().from(users);
    return resultado; // Retorna os dados para o controller
  } catch (erro) {
    console.error("Erro ao consultar banco de dados:", erro);
    throw new Error("Erro ao buscar dados");
  }
};
