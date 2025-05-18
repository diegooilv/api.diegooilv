import pokemon from "../models/mongo/pokemon.js";
import Type from "../models/mongo/type.js";

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

export async function getTypeByName(name) {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

  let response = await Type.find({ english: formattedName }).select(
    "-_id -__v"
  );

  if (response.length === 0) {
    response = await pokemon
      .find({
        $or: [
          { japanese: formattedName },
          { chinese: formattedName },
          { french: formattedName },
        ],
      })
      .select("-_id -__v");
  }

  return response.length > 0 ? response[0] : null;
}
