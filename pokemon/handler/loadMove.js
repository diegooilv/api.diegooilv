// import.js
import mongoose from "mongoose";
import Move from "../models/move.js";
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
const data = JSON.parse(fs.readFileSync("../json/moves.json", "utf-8"));

try {
  await Move.insertMany(data);
  console.log("Moves inseridos com sucesso!");
} catch (err) {
  console.error("Erro ao inserir:", err);
}

await mongoose.disconnect();
