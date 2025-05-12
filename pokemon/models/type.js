import mongoose from "mongoose";

const { Schema } = mongoose;

const TypeSchema = new Schema({
  english: { type: String, required: true },
  chinese: { type: String, required: true },
  japanese: { type: String, required: true },
});

const Type = mongoose.model("Type", TypeSchema);

export default Type;
