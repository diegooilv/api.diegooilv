// controller/userController.js
import { getTabela } from "../services/userPg.js";

export const getTabelaController = async (req, res, next) => {
  try {
    const response = await getTabela(); // Chama a função do serviço

    // Retorna a resposta com o status e dados
    res.status(response.status || 200).json(response);
  } catch (erro) {
    // Caso haja erro no controller
    console.error("Erro ao obter dados:", erro);
    res
      .status(500)
      .json({ message: "Erro ao obter dados", error: erro.message });
  }
};
