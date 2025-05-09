import { config } from "../config/env.js";

export const validKey = (req, res, next) => {
  const keyHeader = req.headers["x-api-key"];

  if (!keyHeader || keyHeader !== config.apiKey) {
    return res.status(401).json({ error: "Chave de API inválida ou ausente" });
  }

  next();
};
