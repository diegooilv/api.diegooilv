// services/userService.js
import { db } from "../config/db.js";
import users from "../models/pg/user.js";
import { hashPassword, verifyPassword } from "../utils/crypto.js";
import { eq } from "drizzle-orm"; // <-- importe o helper de comparação

export const getTabela = async () => {
  try {
    const resultado = await db.select().from(users);
    return resultado; // Retorna os dados para o controller
  } catch (erro) {
    console.error("Erro ao consultar banco de dados:", erro);
    throw new Error("Erro ao buscar dados");
  }
};

export async function createUser(data) {
  const passwordHash = await hashPassword(data.plainPassword);
  return await db.insert(users).values({
    name: data.name,
    email: data.email,
    passwordHash,
  });
}

export async function authenticate(email, plainPassword) {
  // Executa a consulta usando eq para comparar colunas
  const [user] = await db.select().from(users).where(eq(users.email, email)); // <-- aqui

  if (!user || !user.passwordHash) return null;

  const ok = await verifyPassword(user.passwordHash, plainPassword);
  return ok ? user : null;
}
