/*  private int id;
    private String nome;
    private String numero;
    private String email;
    private String cpf;
    private String endereco;
*/

import { cpf as cpfValidator } from "cpf-cnpj-validator";

export function validateUserJava(req, res, next) {
  const { id, nome, numero, email, cpf, endereco } = req.body;

  if (!id || !nome || !numero || !email || !cpf || !endereco) {
    return res.status(400).json({
      error: "Faltou algum campo! Utilize {id, nome, numero, email, cpf, endereco}!",
    });
  }

  if (nome.length <= 2) {
    return res.status(400).json({
      error: "Nome curto demais!",
    });
  }

  if (!/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/.test(numero)) {
    return res.status(400).json({
      error: "Número inválido! Use o formato (51) 99999-9999",
    });
  }

  if (
    !/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/.test(email)
  ) {
    return res.status(400).json({
      error: "E-mail inválido! Use um formato como exemplo@dominio.com",
    });
  }

  // Validar formato básico CPF antes da validação lógica
  if (!/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(cpf)) {
    return res.status(400).json({
      error: "CPF inválido! Use formato 000.000.000-00 ou 00000000000",
    });
  } else {
    if (!cpfValidator.isValid(cpf)) {
      return res.status(400).json({
        error: "CPF inválido: dígitos verificadores incorretos",
      });
    }
  }

  if (!/([\w\W]+)\s(\d+)/.test(endereco)) {
    return res.status(400).json({
      error: "Digite um endereço válido!",
    });
  }

  next();
}

