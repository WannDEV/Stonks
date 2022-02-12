const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  spending_price: { type: Number, required: true },
  symbol: { type: String, required: true },
  market: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  failed_at: { type: Date, required: true }, // the excact time it became active. Note: it can't be non-active in here
});

module.exports = mongoose.model("FailedStock", stockSchema);
