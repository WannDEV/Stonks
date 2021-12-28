import axios from "axios";
import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import User from "../../db/models/user";
import Stock from "../../db/models/stock";

const buyStock = async function (req, res, next) {
  const amount = req.body.amount;
  const symbol = req.body.symbol;
  const id = res.locals.decodedAccessToken.id;

  winston.debug(`${amount}, ${symbol}`);

  // Request stock api for current price of stock
  // Calculate total amount
  // Make database call and check if user has enough money
  // If user has enough money: Push stock sale to stocks array and subtract amount

  const queryString = `https://query1.finance.yahoo.com/v7/finance/quote?region=US&lang=en&symbols=${symbol}`;

  const stockData = await axios.get(queryString).catch((err) => {
    return next(boom.badData("Invalid stock symbol"));
  });
  const currentStockPrice = await stockData.data.quoteResponse.result[0]
    .regularMarketPrice;

  winston.debug(`Current market price: ${currentStockPrice}`);

  const totalAmount = amount * currentStockPrice;

  const user = await User.findOne({ _id: id }).catch((err) => {
    if (err) return next(boom.badImplementation(`Database error: ${err}`));
  });
  const userBalance = await user.amount;
  winston.debug(userBalance);

  if (userBalance >= totalAmount) {
    const newBalance = userBalance - totalAmount;

    const stock = new Stock({
      price_at_purchase: currentStockPrice,
      amount,
      symbol,
    });

    stock.save().then((result) => {
      User.findOne({ _id: id }, (err, user) => {
        if (user) {
          user.stocks.push(stock);
          user.amount = newBalance;
          user.save();
          return res.status(200).json({ message: "Transaction approved" });
        }
        if (err) return next(boom.badImplementation(`Database error: ${err}`));
      })
        .clone()
        .catch((err) => {
          if (err)
            return next(boom.badImplementation(`Database error: ${err}`));
        });
    });
  } else {
    return next(boom.badRequest("Transaction denied due to lack of money"));
  }
};

export default buyStock;
