import mongoose from "mongoose";

const { Schema } = mongoose;

const MoveSchema = new Schema({
  _id: { type: Number, required: true },
  accuracy: { type: Number },
  category: { type: String },
  cname: { type: String }, // Nome em chinês
  ename: { type: String }, // Nome em inglês
  jname: { type: String }, // Nome em japonês (opcional)
  power: { type: Number },
  pp: { type: Number },
  type: { type: String }, // Exemplo: "Normal"
});

const Move = mongoose.model("Move", MoveSchema);

export default Move;
