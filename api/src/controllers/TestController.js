import User from "../db/models/user";
import Stock from "../db/models/stock";
const mongoose = require("mongoose");
import winston from "../utils/logger/winston";
import boom from "@hapi/boom";

const TestController = {
  async testFetch(req, res) {
    const id = res.locals.decodedAccessToken.id;
    winston.debug(`${id}, ${mongoose.isValidObjectId(id)}`);

    const stock = new Stock({
      price_at_purchase: 70,
      amount: 7,
      symbol: "GOOG",
    });

    // await User.findByIdAndUpdate(id, { $push: { stocks: stock } }).exec(
    //   (err, user) => {
    //     winston.debug(`updateOne - err: ${err}, user: ${user}`);
    //   }
    // );

    // User.findOneAndUpdate(
    //   { _id: id },
    //   {
    //     $push: {
    //       stocks: { price_at_purchase: 100, amount: 10, symbol: "APPL" },
    //     },
    //   },
    //   { upsert: true }
    // ).exec((err, response) => {
    //   winston.error(`${err}, ${response}`);
    // });

    // User.findOne({ _id: id }, (err, user) => {
    //   if (!err) {
    //     user.stocks.push(stock);
    //     user.save();
    //   } else {
    //     winston.error(err);
    //   }
    // });

    // User.findById({ _id: id })
    //   .populate("stocks")
    //   .exec((err, stock) => {
    //     winston.error(`${stock}, ${err}`);
    //   });

    // const stock = new Stock();

    // stock.price_at_purchase = 100;
    // stock.amount = 10;
    // stock.symbol = "APPL";

    stock.save().then((result) => {
      User.findOne({ _id: id }, (err, user) => {
        if (user) {
          user.stocks.push(stock);
          user.save();
        }
      })
        .clone()
        .catch((err) => {
          winston.error(err);
        });
    });

    // User.findOneAndUpdate(
    //   { _id: id },
    //   {
    //     $push: {
    //       stocks: stock,
    //     },
    //   },
    //   { new: true, upsert: true }
    // ).exec((err, response) => {
    //   winston.error(`${err}, ${response}`);
    // });

    // User.updateOne({ _id: id }, { name: "Bent" }).exec((err, response) => {
    //   console.log(err, response);
    // });

    // User.findOne({ _id: id })
    //   .populate({
    //     path: "stocks",
    //     model: "Stock",
    //   })
    //   .exec((err, stock) => {
    //     console.log(err, stock);
    //   });

    return res.status(200).json({ message: "Success" });
  },
  async testError(req, res, next) {
    if (1 != 2) next(boom.badRequest("Bad query"));
    else res.status(200).json({ message: "1 apparently equals 2" });
  },
};

export default TestController;
