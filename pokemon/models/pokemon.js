import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      english: {
        type: String,
        required: true,
      },
      japanese: String,
      chinese: String,
      french: String,
    },
    type: {
      type: [String],
      required: true,
    },
    base: {
      HP: Number,
      Attack: Number,
      Defense: Number,
      "Sp. Attack": Number,
      "Sp. Defense": Number,
      Speed: Number,
    },
  },
  { versionKey: false }
);

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

export default Pokemon;
