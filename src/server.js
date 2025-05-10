import app from "./app.js";
import { conectarMongoDB, conectarPostgreSQL } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const startServer = async () => {
  try {
    await conectarMongoDB();
    await conectarPostgreSQL();
    console.log("Banco de dados conectado com sucesso!");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log("Servidor rodando na porta 3000");
    });
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(1);
  }
};

startServer(); // Inicia o servidor
