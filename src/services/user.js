import user from "../models/mongo/user.js";

// Função para pegar todos os usuários
export async function getUsers() {
  try {
    const usuarios = await user.find();
    return usuarios;
  } catch (erro) {
    console.error("Erro ao obter usuários:", erro);
    return { status: 500, message: "Erro interno ao buscar usuários" };
  }
}

// Função para criar um novo usuário
export async function createUser(name, email, idade) {
  // Validação simples de dados
  if (!name || !email || !idade) {
    return { status: 400, message: "Todos os campos são obrigatórios" };
  }

  try {
    const novoUsuario = new user({ name, email, idade });
    await novoUsuario.save();
    return {
      status: 201,
      message: "Usuário criado com sucesso",
      user: novoUsuario,
    };
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro);
    return { status: 500, message: "Erro interno ao criar usuário" };
  }
}

// Função para pegar um usuário pelo ID
export async function getUser(id) {
  try {
    const usuarioEncontrado = await user.findById(id);

    if (!usuarioEncontrado) {
      return { status: 404, message: "Usuário não encontrado" };
    }

    return { status: 200, user: usuarioEncontrado };
  } catch (erro) {
    console.error("Erro ao buscar usuário:", erro);
    return { status: 500, message: "Erro interno ao buscar usuário" };
  }
}
