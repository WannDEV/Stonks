const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pendingStockSchema = new Schema({
  spending_price: { type: Number, required: true },
  symbol: { type: String, required: true },
  market: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  active_from: { type: Date, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  trade_type: { type: String, required: true }, // buy, sell
  is_cancelled: { type: Boolean, required: true },
  cancellation_at: { type: Date },
});

module.exports = mongoose.model("PendingStock", pendingStockSchema);
