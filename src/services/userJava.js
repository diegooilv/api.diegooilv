import { db } from "../config/db.js";
import users from "../models/pg/userJava.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  try {
    const resultado = await db.select().from(users).orderBy("id", "asc");
    return resultado;
  } catch (erro) {
    console.error("Erro", erro);
    return { status: 500, message: "Erro interno ao buscar usuários" };
  }
};

export const createUser = async (id, nome, numero, email, cpf, endereco) => {
  const data = {
    id,
    nome,
    numero,
    email,
    cpf,
    endereco,
  };

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (existingUser.length > 0) {
      return { status: 400, message: "ID já existe" };
    }

    await db.insert(users).values(data);

    return { status: 201, message: "Usuário criado com sucesso" };
  } catch (erro) {
    console.error(erro);
    return { status: 500, message: "Erro Interno!" };
  }
};
