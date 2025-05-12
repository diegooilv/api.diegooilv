### Modelo Mongoose

Primeiro, o esquema do modelo de Pokémon (`Pokemon`):

```js
import mongoose from "mongoose";

const { Schema } = mongoose;

const PokemonSchema = new Schema({
  name: {
    english: { type: String, required: true },
    japanese: { type: String },
    chinese: { type: String },
  },
  id: { type: Number, required: true },
  type: [String],
  abilities: [String],
  stats: {
    hp: { type: Number },
    attack: { type: Number },
    defense: { type: Number },
    speed: { type: Number },
    specialAttack: { type: Number },
    specialDefense: { type: Number },
  },
});

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

export default Pokemon;
```

### Consultas no Mongoose

Aqui estão as consultas que você pode usar para buscar os Pokémons de acordo com diferentes parâmetros.

#### 1. **Buscar Pokémon pelo nome (em inglês, japonês ou chinês)**

##### Nome em inglês:

```js
const pokemonInEnglish = await Pokemon.findOne({ "name.english": "Pikachu" });
```

##### Nome em japonês:

```js
const pokemonInJapanese = await Pokemon.findOne({
  "name.japanese": "ピカチュウ",
});
```

##### Nome em chinês:

```js
const pokemonInChinese = await Pokemon.findOne({ "name.chinese": "比卡丘" });
```

#### 2. **Buscar Pokémon pelo ID**

```js
const pokemonById = await Pokemon.findOne({ id: 25 });
```

#### 3. **Buscar Pokémon por tipo**

```js
const pokemonByType = await Pokemon.find({ type: "Electric" });
```

#### 4. **Buscar Pokémon por habilidade (abilities)**

```js
const pokemonByAbility = await Pokemon.find({ abilities: "Static" });
```

#### 5. **Buscar Pokémon com múltiplos critérios**

Por exemplo, buscar Pokémons do tipo **Electric** e que tenham a habilidade **Static**:

```js
const pokemonByTypeAndAbility = await Pokemon.find({
  type: "Electric",
  abilities: "Static",
});
```

#### 6. **Buscar Pokémon por nome parcialmente (usando regex)**

Se você quiser buscar Pokémons que contenham um nome específico, pode usar expressões regulares (regex):

```js
const pokemonLikeName = await Pokemon.find({
  "name.english": { $regex: "Pika", $options: "i" }, // 'i' para case-insensitive
});
```

#### 7. **Buscar Pokémon com stats específicos (ex: HP maior que 50)**

```js
const pokemonByHP = await Pokemon.find({ "stats.hp": { $gt: 50 } });
```

#### 8. **Ordenar os resultados**

Você pode ordenar os resultados de várias maneiras, como por ID ou por tipo:

```js
const pokemonSortedById = await Pokemon.find().sort({ id: 1 }); // Ascendente
const pokemonSortedByType = await Pokemon.find().sort({ type: 1 }); // Ascendente por tipo
```

#### 9. **Limitar os resultados**

Para retornar apenas um número limitado de resultados, use `.limit()`:

```js
const limitedResults = await Pokemon.find().limit(10); // Limita a 10 resultados
```

#### 10. **Buscar Pokémon com projeção de campos**

Se você quiser retornar apenas alguns campos específicos, use a projeção:

```js
const pokemonWithSelectedFields = await Pokemon.find(
  { id: 25 },
  { "name.english": 1, type: 1 } // Retorna apenas o nome em inglês e tipo
);
```

---

### Exemplo Completo

Aqui está um exemplo completo de um servidor Express que faz essas consultas com Mongoose:

```js
import express from "express";
import mongoose from "mongoose";
import Pokemon from "./models/Pokemon.js";

const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoose.connect("mongodb://localhost:27017/pokedex", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/pokemon/name/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const pokemon = await Pokemon.findOne({ "name.english": name });
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon não encontrado!" });
    }
    return res.json(pokemon);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
});

app.get("/api/pokemon/type/:type", async (req, res) => {
  const { type } = req.params;

  try {
    const pokemons = await Pokemon.find({ type });
    if (pokemons.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum Pokémon encontrado com esse tipo." });
    }
    return res.json(pokemons);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor", error });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```
