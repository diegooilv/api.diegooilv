import {
  getClima,
  getPrevisao,
  getPrevisao12h,
  getLatLon,
} from "../services/openweather.js";

export const getClimaAtualController = async (req, res, next) => {
  const response = await getClima(req.params.cidade);
  if (response === null) {
    return res.status(404).json({ error: "Cidade não encontrada." });
  }
  res.status(200).json(response);
};

export const getPrevisaoClimaController = async (req, res, next) => {
  const response = await getPrevisao(req.params.cidade);
  if (response === null) {
    return res.status(404).json({ error: "Cidade não encontrada." });
  }
  res.status(200).json(response);
};

export const getPrevisao12hClimaController = async (req, res, next) => {
  const response = await getPrevisao12h(req.params.cidade);
  if (response === null) {
    return res.status(404).json({ error: "Cidade não encontrada." });
  }
  res.status(200).json(response);
};

export const getLatLonController = async (req, res, next) => {
  const response = await getLatLon(req.params.cidade);
  if (response === null) {
    return res.status(404).json({ error: "Cidade não encontrada." });
  }
  res.status(200).json(response);
};
