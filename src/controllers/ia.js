import ia from "../services/ia.js";

export const iaController = async (req, res, next) => {
  const response = await ia(req.body.prompt);
  return res.status(200).json({ res: response });
};
