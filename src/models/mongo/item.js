import mongoose from "mongoose";

const { Schema } = mongoose;

const ItemSchema = new Schema({
  _id: { type: Number, required: true },
  name: {
    english: { type: String, required: true },
    japanese: { type: String },
    chinese: { type: String },
  },
});

const Item = mongoose.model("Item", ItemSchema);

export default Item;
