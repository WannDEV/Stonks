const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  price_at_purchase: { type: Number, required: true },
  amount: { type: Number, required: true },
  symbol: { type: String, required: true },
});

module.exports = mongoose.model("Stock", stockSchema);
