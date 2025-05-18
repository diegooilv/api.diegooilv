import { getClima } from "../services/openweather.js";

export const getClimaAtualController = async (req, res, next) => {
  const response = await getClima(req.params.cidade);
  if (response === null) {
    return res.status(404).json({ error: "Cidade não encontrada." });
  }
  res.status(200).json(response);
};
