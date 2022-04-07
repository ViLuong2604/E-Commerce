const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array ,default: ['XS','S','M']},
    color: { type: Array,default :['black','red','blue'] },
    price: { type: Number, required: true },
    inStock : {type : Boolean , default :true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);