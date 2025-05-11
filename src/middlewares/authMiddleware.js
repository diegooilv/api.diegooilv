import { verifyToken } from "../utils/jwt.js";

export function verifyAuthToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Espera que o token esteja no header 'Authorization' no formato 'Bearer token'

  if (!token) {
    // Caso o token não exista, retorna um erro 401 e uma mensagem
    return res
      .status(401)
      .json({ message: "Token não fornecido. Redirecione para o login." });
  }

  try {
    const decoded = verifyToken(token); // Verifica o token com a função 'verifyToken'
    req.user = decoded; // Salva o usuário decodificado na requisição
    next(); // Passa para a próxima função (rota)
  } catch (error) {
    // Se o token for inválido ou expirado, retorna erro 401
    return res.status(401).json({
      message: "Token inválido ou expirado. Redirecione para o login.",
    });
  }
}
