import { db } from "../config/db.js";
import users from "../models/pg/pessoaJava.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  try {
    const resultado = await db.select().from(users).orderBy("id", "asc");
    return { status: 200, resultado };
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
    if (email) {
      const emailEmUso = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (emailEmUso.length > 0 && emailEmUso[0].id !== id) {
        return {
          status: 400,
          message: "Email já está em uso por outro usuário.",
        };
      }
    }

    const updateData = {};
    if (nome !== undefined) updateData.nome = nome;
    if (email !== undefined) updateData.email = email;
    if (senha !== undefined) {
      const hashedSenha = await bcrypt.hash(senha, 10);
      updateData.senha = hashedSenha;
    }
    if (endereco !== undefined) updateData.endereco = endereco;

    if (Object.keys(updateData).length === 0) {
      return {
        status: 400,
        message: "Nenhum dado fornecido para atualização.",
      };
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    return { status: 200, message: "Usuário atualizado com sucesso." };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { status: 500, message: "Erro interno ao atualizar usuário." };
  }
};

export const loginUser = async (email, senha) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (result.length === 0) {
      return { status: 404, message: "Usuário não encontrado" };
    }

    const user = result[0];
    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return { status: 401, message: "Senha incorreta" };
    }

    return {
      status: 200,
      message: "Login realizado com sucesso",
      data: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { status: 500, message: "Erro interno ao fazer login" };
  }
};
