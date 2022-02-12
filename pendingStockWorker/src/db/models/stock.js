const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  price_at_purchase: { type: Number, required: true }, // the price one share was bought for
  amount: { type: Number, required: true },
  symbol: { type: String, required: true },
  market: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: "Game" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  active_from: { type: Date, required: true }, // the excact time it became active. Note: it can't be non-active in here
  name: { type: String, required: true },
  img: { type: String, required: true },
});

module.exports = mongoose.model("Stock", stockSchema);
