import dotenv from "dotenv";

dotenv.config();

if (!process.env.KEY) {
  console.warn("⚠️ Variável KEY não definida no .env");
}

export const config = {
  apiKey: process.env.KEY || "chave-padrao", // fallback (não recomendado em prod)
};
