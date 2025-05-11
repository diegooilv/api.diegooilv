// controller/userController.js
import { getTabela, createUser, authenticate } from "../services/userPg.js";
import { generateToken } from "../utils/jwt.js"; // Importando a função de geração de token
import { verifyToken } from "../utils/jwt.js";

export const getTabelaController = async (req, res) => {
  try {
    const resultado = await getTabela();
    res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao obter dados:", erro);
    res.status(500).json({
      message: "Erro ao obter dados",
      error: erro.message,
    });
  }
};

export async function signup(req, res) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ message: "Usuário criado!" });
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro);
    res
      .status(400)
      .json({ message: "Erro ao criar usuário", error: erro.message });
  }
}

export async function login(req, res) {
  try {
    const user = await authenticate(req.body.email, req.body.password);
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Gerar o token JWT usando a função do utils/jwt.js
    const token = generateToken(user);

    // Enviar o token para o cliente
    res.json({ token });
  } catch (erro) {
    console.error("Erro no login:", erro);
    res
      .status(500)
      .json({ message: "Erro ao autenticar", error: erro.message });
  }
}

export function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Acesso não autorizado" });
  }

  try {
    const decoded = verifyToken(token); // Verifica o token
    req.user = decoded; // Armazena os dados do usuário na requisição
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
}

export function showData(req, res, next) {
  return res.status(200).json({ name: req.user.name, email: req.user.email });
}
