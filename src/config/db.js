import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB || "mongodb://127.0.0.1:27017/API";

export async function conectarDB() {
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

    const dbInfo =
      mongoose.connection.host === "localhost" ? "local" : "remoto";
    //console.log(
    //   `🟢 Conectado ao MongoDB (${dbInfo}) em ${mongoose.connection.host}`
    //);
  } catch (erro) {
    console.error("❌ Erro ao conectar no MongoDB:", erro.message);
    throw new Error("Erro na conexão com o MongoDB");
  }
}
