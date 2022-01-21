const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pendingStockSchema = new Schema({
  // price_at_purchase: { type: Number, required: true }, // not needed because when PendingStockWorker activates it, it pulls the stock price then
  amount: { type: Number, required: true },
  spending_price: { type: Number, required: true },
  symbol: { type: String, required: true },
  market: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  active_from: { type: Date, required: true },
});

module.exports = mongoose.model("PendingStock", pendingStockSchema);
