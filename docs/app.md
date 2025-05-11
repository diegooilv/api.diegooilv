# 📦 API `/app` — Visão Geral

Esta API fornece funcionalidades básicas de autenticação de usuários e acesso a dados protegidos. As rotas estão organizadas sob o prefixo `/app`.

## 📁 Rotas

### 🔍 POST `/app/buscar`

- **Descrição**: Retorna **todos os registros salvos** no banco de dados.
- **Autenticação**: Protegida por chave de API (`x-api-key`)
- **Headers esperados**:

```

x-api-key: sua\_chave\_aqui

```

- **Resposta**:

```json
[
  {
    "id": 1,
    "name": "Diego",
    "email": "diego@email.com",
    ...
  },
  ...
]
```

---

### 🧾 POST `/app/signup`

- **Descrição**: Cria um novo usuário.
- **Body obrigatório**:

  ```json
  {
    "name": "Diego",
    "email": "diego@email.com",
    "plainPassword": "senhaSegura"
  }
  ```

- **Resposta**:

  ```json
  {
    "message": "Usuário criado!"
  }
  ```

---

### 🔐 POST `/app/login`

- **Descrição**: Autentica o usuário e gera um token JWT.
- **Body obrigatório**:

  ```json
  {
    "email": "diego@email.com",
    "password": "senhaSegura"
  }
  ```

- **Resposta**:

  ```json
  {
    "token": "JWT_gerado"
  }
  ```

---

### ✅ POST `/app/`

- **Descrição**: Retorna os dados do usuário autenticado (**nome e e-mail**).
- **Autenticação**: Protegida por token JWT.
- **Headers esperados**:

  ```
  Authorization: Bearer <token>
  ```

- **Resposta**:

  ```json
  {
    "name": "Diego",
    "email": "diego@email.com"
  }
  ```

---

## 🔐 Segurança

- `validKey`: Middleware que exige a presença de uma `x-api-key`.
- `verifyAuthToken`: Middleware que exige um JWT válido no header `Authorization`.
- `validateBodyFields`: Garante que os campos obrigatórios estejam presentes nas requisições.

---

## 🧠 Observações

- As senhas dos usuários são armazenadas como **hashes seguros**, nunca em texto plano.
- O JWT carrega apenas informações básicas do usuário (id, email, name).
- Para acessar rotas protegidas, é necessário incluir o token JWT no cabeçalho da requisição.
