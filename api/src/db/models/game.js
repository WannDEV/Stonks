const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  urlId: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  stocks: [{ type: Schema.Types.ObjectId, ref: "Stock" }],
  allowedMarkets: [{ type: String, required: true }],
  name: { type: String, required: true },
  commission: { type: Number, required: true },
  startBalance: { type: Number, required: true },
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  balances: [
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      balance: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
