// import.js
import mongoose from "mongoose";
import Type from "./models/type.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Conectando ao banco de dados
const uri = process.env.DB;
await mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Carregando o JSON
const data = JSON.parse(fs.readFileSync("./json/types.json", "utf-8"));

try {
  await Type.insertMany(data);
  console.log("Types inseridos com sucesso!");
} catch (err) {
  console.error("Erro ao inserir:", err);
}

await mongoose.disconnect();
