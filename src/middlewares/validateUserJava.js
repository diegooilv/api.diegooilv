/*  private int id;
    private String nome;
    private String numero;
    private String email;
    private String cpf;
    private String endereco;
*/

// validateUser.js

// Middleware de validação de usuário, replicando as regras do Java (Pessoa.java)
// Inclui validação de id, nome, número, email, cpf (com cálculo de dígitos) e endereço

// Função auxiliar que replica o método validarCpfDigitos() do Java
function validarCpfDigitos(cpf) {
  // Remove todos os caracteres não numéricos
  const somenteDigitos = cpf.replace(/\D/g, "");

  // Deve ter exatamente 11 dígitos
  if (somenteDigitos.length !== 11) {
    return false;
  }

  // Se todos os dígitos forem iguais, é inválido
  if (somenteDigitos.split("").every((d) => d === somenteDigitos[0])) {
    return false;
  }

  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(somenteDigitos.charAt(i), 10) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 >= 10) {
    digito1 = 0;
  }

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(somenteDigitos.charAt(i), 10) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 >= 10) {
    digito2 = 0;
  }

  // Verifica se bate com os dígitos 10 e 11 do CPF
  return (
    digito1 === parseInt(somenteDigitos.charAt(9), 10) &&
    digito2 === parseInt(somenteDigitos.charAt(10), 10)
  );
}

// Middleware principal de validação
export function validateUserJava(req, res, next) {
  const { id, nome, numero, email, cpf, endereco } = req.body;

  // 1) Verifica se todos os campos existem
  if (
    id === undefined ||
    nome === undefined ||
    numero === undefined ||
    email === undefined ||
    cpf === undefined ||
    endereco === undefined
  ) {
    return res.status(400).json({
      error:
        "Faltou algum campo! Utilize {id, nome, numero, email, cpf, endereco}!",
    });
  }

  // 2) Verificar se id é número inteiro e >= 0 (mesma lógica de setId em Java)
  const idNum = Number(id);
  if (!Number.isInteger(idNum) || idNum < 0) {
    return res.status(400).json({
      error: "ID inválido!",
    });
  }

  // 3) Nome deve ter mais de 2 caracteres (mesma lógica de setNome)
  if (typeof nome !== "string" || nome.length <= 2) {
    return res.status(400).json({
      error: "Nome inválido! Deve ter mais de 2 caracteres.",
    });
  }

  // 4) Número de telefone: mesmo regex do Java
  if (
    typeof numero !== "string" ||
    !/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(numero)
  ) {
    return res.status(400).json({
      error: "Número inválido! Use o formato (51) 99999-9999",
    });
  }

  // 5) E-mail: mesmo regex do Java
  if (
    typeof email !== "string" ||
    !/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(
      email
    )
  ) {
    return res.status(400).json({
      error: "E-mail inválido! Use um formato como exemplo@dominio.com",
    });
  }

  // 6) CPF: primeiro formato básico, depois validação de dígitos via validarCpfDigitos()
  if (typeof cpf !== "string" || !/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf)) {
    return res.status(400).json({
      error: "CPF inválido! Use formato 000.000.000-00 ou 00000000000",
    });
  } else {
    if (!validarCpfDigitos(cpf)) {
      return res.status(400).json({
        error: "CPF inválido: dígitos verificadores incorretos",
      });
    }
  }

  // 7) Endereço: mesmo regex do Java (texto + espaço + número)
  if (typeof endereco !== "string" || !/([\w\W]+)\s(\d+)/.test(endereco)) {
    return res.status(400).json({
      error: "Digite um endereço válido!",
    });
  }

  // Se todas as validações passarem, segue para o próximo middleware
  next();
}
