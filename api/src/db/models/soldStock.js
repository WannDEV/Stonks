const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const soldStockSchema = new Schema({
  sold_for_per_share: { type: Number, required: true },
  amount: { type: Number, required: true },
  symbol: { type: String, required: true },
  market: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  selling_date: { type: Date, required: true },
});

module.exports = mongoose.model("SoldStock", soldStockSchema);
