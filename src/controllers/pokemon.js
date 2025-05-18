import {
  getPokemonById,
  getPokemonByName,
  getTypeByName,
} from "../services/pokemon.js";

export const getPokemonByIdController = async (req, res, next) => {
  const response = await getPokemonById(Number(req.params.id));
  if (response === null) {
    return res.status(404).json({ error: "Pokémon não encontrado." });
  }

  res.status(200).json(response);
};

export const getPokemonByNameController = async (req, res, next) => {
  const response = await getPokemonByName(req.params.name);
  if (response === null) {
    return res.status(404).json({ error: "Pokémon não encontrado." });
  }
  res.status(200).json(response);
};

export const getTypeByNameController = async (req, res, next) => {
  const response = await getTypeByName(req.params.name);
  if (response === null) {
    return res.status(404).json({ error: "Type não encontrado." });
  }
  res.status(200).json(response);
};
