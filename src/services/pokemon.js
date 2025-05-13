import pokemon from "../models/mongo/pokemon.js";

export async function getPokemonById(id) {
  const response = await pokemon.findById(Number(id));
  console.log(response);
  return response;
}

export async function getPokemonByName(name) {
  // Coloca a primeira letra em maiúscula
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  // Primeiro tenta pelo name.english
  let response = await pokemon.find({ "name.english": formattedName });

  // Se não encontrou, tenta nos outros idiomas
  if (response.length === 0) {
    response = await pokemon.find({
      $or: [
        { "name.japanese": formattedName },
        { "name.chinese": formattedName },
        { "name.french": formattedName },
      ],
    });
  }

  return response.length > 0 ? response : null;
}
