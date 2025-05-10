import mongoose from "mongoose";
import dotenv from "dotenv";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Carrega variáveis de ambiente
dotenv.config();

// Conexão com MongoDB
const conectarMongoDB = async () => {
  const uri = process.env.DB || "mongodb://127.0.0.1:27017/API";
  if (!uri) {
    console.error("❌ URI do MongoDB não definida no .env (DB)");
    throw new Error("Variável de ambiente DB não encontrada");
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado ao MongoDB!");
  } catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB:", erro.message);
    throw new Error("Erro na conexão com o MongoDB");
  }
};

// Conexão com PostgreSQL
const conectarPostgreSQL = () => {
  const pool = new pg.Pool({
    connectionString: process.env.DBB,
    ssl: { rejectUnauthorized: false },
  });

  const db = drizzle(pool);
  console.log("🟢 Conectado ao PostgreSQL!");

  return db;
};

// Exportar funções de conexão
export { conectarMongoDB, conectarPostgreSQL };
