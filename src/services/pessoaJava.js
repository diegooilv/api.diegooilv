import { db } from "../config/db.js";
import users from "../models/pg/pessoaJava.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  try {
    const resultado = await db.select().from(users).orderBy("id", "asc");
    return resultado;
  } catch (erro) {
    console.error("Erro", erro);
    return { status: 500, message: "Erro interno ao buscar usuários" };
  }
};

export const createUser = async (nome, email, senha, endereco) => {
  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { status: 400, message: "Email já cadastrado" };
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    await db.insert(users).values({
      nome,
      email,
      senha: hashedSenha,
      endereco,
    });

    return { status: 201, message: "Usuário criado com sucesso" };
  } catch (erro) {
    console.error(erro);
    return { status: 500, message: "Erro interno!" };
  }
};

export const updateUser = async (id, nome, email, senha, endereco) => {
  try {
    const existingUser = await db.select().from(users).where(eq(users.id, id));

    if (existingUser.length === 0) {
      return { status: 404, message: "Usuário não existe." };
    }

    await db
      .update(users)
      .set({
        nome,
        email,
        senha,
        endereco,
      })
      .where(eq(users.id, id));

    return { status: 200, message: "Usuário atualizado com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { status: 500, message: "Erro interno ao atualizar usuário." };
  }
};
