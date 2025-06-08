# 🧬 API `/dex` — Visão Geral

Esta API permite buscar informações detalhadas de **Pokémons** e seus **tipos**. Todas as rotas são públicas e acessíveis via requisições `GET`.

## 📁 Rotas

---

### 🆔 GET `/dex/pokemon/id/:id`

- **Descrição**: Retorna os **dados completos de um Pokémon** com base no seu **ID numérico**.

- **Parâmetros de rota obrigatórios**:

  ```
  :id → número inteiro do Pokémon
  ```

- **Exemplo de requisição**:

  ```
  GET /pokemon/id/772
  ```

- **Resposta**:

  ```json
  {
    "id": 772,
    "name": {
      "english": "Type: Null",
      "japanese": "タイプ：ヌル",
      "chinese": "属性：空",
      "french": "Silvallié"
    },
    "type": ["Normal"],
    "base": {
      "HP": 95,
      "Attack": 95,
      "Defense": 95,
      "Sp. Attack": 95,
      "Sp. Defense": 95,
      "Speed": 59
    }
  }
  ```

---

### 🔤 GET `/dex/pokemon/name/:name`

- **Descrição**: Retorna os **dados completos de um Pokémon** com base no seu **nome**.

- **Parâmetros de rota obrigatórios**:

  ```
  :name → nome em inglês do Pokémon
  ```

- **Exemplo de requisição**:

  ```
  GET /pokemon/name/Type:%20Null
  ```

- **Resposta**:

  ```json
  {
    "id": 772,
    "name": {
      "english": "Type: Null",
      "japanese": "タイプ：ヌル",
      "chinese": "属性：空",
      "french": "Silvallié"
    },
    "type": ["Normal"],
    "base": {
      "HP": 95,
      "Attack": 95,
      "Defense": 95,
      "Sp. Attack": 95,
      "Sp. Defense": 95,
      "Speed": 59
    }
  }
  ```

---

### 🔎 GET `/dex/type/name/:name`

- **Descrição**: Retorna a tradução de um **tipo de Pokémon** em diferentes idiomas.

- **Parâmetros de rota obrigatórios**:

  ```
  :name → nome do tipo
  ```

- **Exemplo de requisição**:

  ```
  GET /type/name/Flying
  ```

- **Resposta**:

  ```json
  {
    "type": {
      "english": "Flying",
      "chinese": "飞行",
      "japanese": "ひこう"
    }
  }
  ```

---
