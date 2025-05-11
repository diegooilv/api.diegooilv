import mongoose from "mongoose";
import dotenv from "dotenv";
import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

dotenv.config();

let db = null; // Drizzle DB global

// MongoDB
const conectarMongoDB = async () => {
  const uri = process.env.DB || "mongodb://127.0.0.1:27017/API";
  if (!uri) throw new Error("Variável de ambiente DB não encontrada");

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado ao MongoDB!");
  } catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB:", erro.message);
    throw erro;
  }
};

// PostgreSQL
const conectarPostgreSQL = () => {
  const pool = new pg.Pool({
    connectionString: process.env.DBB,
    ssl: { rejectUnauthorized: false },
  });

  db = drizzle(pool);
  console.log("🟢 Conectado ao PostgreSQL!");
};

// Exporta as conexões e o `db`
export { conectarMongoDB, conectarPostgreSQL, db };
