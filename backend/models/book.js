import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  editorial: String,
  yearPublication: Date,
  pages: Number,
  category: String,
  priceRental: Number,
  pricePurchase: Number,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});
const book = mongoose.model("books", bookSchema);
export default book;
