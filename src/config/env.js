import dotenv from "dotenv";

dotenv.config();

if (!process.env.KEY) {
  console.warn("⚠️ Variável KEY não definida no .env");
}
// JWT_SECRET, JWT_EXPIRATION
export const config = {
  apiKey: process.env.KEY || "chave-padrao", // fallback (não recomendado em prod)
  JWT_SECRET: process.env.JWT_SECRET || "123",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "24h"
};

