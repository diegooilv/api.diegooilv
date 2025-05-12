// import.js
import mongoose from "mongoose";
import Item from "../models/item.js";
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
const data = JSON.parse(fs.readFileSync("../json/items.json", "utf-8"));

try {
  await Item.insertMany(data);
  console.log("Items inseridos com sucesso!");
} catch (err) {
  console.error("Erro ao inserir:", err);
}

await mongoose.disconnect();
