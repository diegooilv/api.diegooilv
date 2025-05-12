// import.js
import mongoose from "mongoose";
import Pokemon from "./models/Pokemon.js";
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
const data = JSON.parse(fs.readFileSync("./json/pokemons.json", "utf-8"));

// Renomeando `id` para `_id`
const pokemons = data.map((pokemon) => {
  const { id, ...resto } = pokemon;
  return { _id: id, ...resto };
});

try {
  await Pokemon.insertMany(pokemons);
  console.log("Pokémons inseridos com sucesso!");
} catch (err) {
  console.error("Erro ao inserir:", err);
}

await mongoose.disconnect();
