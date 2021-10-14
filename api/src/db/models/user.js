const mongoose = require("mongoose");
const Stock = require("./stock");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  googleId: { type: String, required: true },
  provider: { type: String, required: true },
  locale: { type: String, required: true },
  picture: { type: String, required: true },
  role: { type: String, required: true },
  amount: { type: Number, required: true },
  stocks: [{ type: Schema.Types.ObjectId, ref: "Stock" }],
});

module.exports = mongoose.model("User", userSchema);
