import axios from "axios";
import boom from "@hapi/boom";
import mongoose from "mongoose";

import User from "../../db/models/user";
import Stock from "../../db/models/stock";
import winston from "../../utils/logger/winston";

const sellStock = async function (req, res, next) {
  const amount = req.body.amount;
  const symbol = req.body.symbol;
  const id = res.locals.decodedAccessToken.id;
  let ownedStocks = [];
  let balance = 0;

  const populatedUser = await User.findOne({ _id: id })
    .populate({
      path: "stocks",
      model: "Stock",
    })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  ownedStocks = await populatedUser.stocks;
  balance = await populatedUser.amount;

  // Figure out if user has enough stocks to sell
  let tempCounter = 0;
  for (let i = 0; i < ownedStocks.length; ++i) {
    if (ownedStocks[i].symbol == symbol) tempCounter += ownedStocks[i].amount;
  }

  if (tempCounter < amount)
    return next(boom.badRequest("User doesn't have enough stocks to sell"));

  let referenceIds = [];

  await User.findOne({ _id: id }).exec((err, response) => {
    if (err) return next(boom.badImplementation(`Database error: ${err}`));

    referenceIds = response.stocks;

    winston.debug(`Reference ids: ${response.stocks}`);
  });

  const queryString = `https://query1.finance.yahoo.com/v7/finance/quote?region=US&lang=en&symbols=${symbol}`;

  const stockData = await axios.get(queryString).catch((err) => {
    return next(boom.badData("Invalid stock symbol"));
  });
  const currentStockPrice = await stockData.data.quoteResponse.result[0]
    .regularMarketPrice;

  balance += currentStockPrice * amount;

  winston.debug(`Current market price: ${currentStockPrice}`);
  winston.debug(`Owned stocks: ${ownedStocks}`);
  winston.debug(`Balance: ${balance}`);

  // Algorithm to figure out indexes of stocks that needs to be sold
  let indexes = [];
  let indexesWithReferenceIds = [];
  let splitStockArray = [];
  let tempStocks = ownedStocks;

  // Figure out which stocks to sell
  if (ownedStocks.length > 0) {
    let tempAmount = amount;

    for (let i = 0; i < ownedStocks.length; ++i) {
      if (ownedStocks[i].symbol == symbol) {
        tempAmount -= ownedStocks[i].amount;
        if (tempAmount >= 0) {
          indexes.push(i);
        } else {
          let splitStock = tempStocks[i];
          splitStock.amount =
            splitStock.amount - (tempAmount + ownedStocks[i].amount);
          tempStocks[i] = splitStock;
          winston.debug(`Split stock: ${splitStock}`);
          splitStockArray.push(splitStock, referenceIds[i]);
          break;
        }
      }
    }
  }

  for (let i = 0; i < indexes.length; ++i) {
    indexesWithReferenceIds.push(mongoose.Types.ObjectId(referenceIds[i]));
  }

  for (let i = indexes.length - 1; i >= 0; i--) {
    tempStocks.splice(indexes[i], 1);
  }

  // winston.debug(tempStocks);
  winston.debug(indexes);

  // Debugging method
  let tempValue = 0;
  for (let i = 0; i < tempStocks.length; ++i) {
    if (tempStocks[i].symbol == symbol) tempValue += tempStocks[i].amount;
  }
  winston.debug(tempValue);

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session };

    if (splitStockArray.length > 0) {
      await Stock.findByIdAndUpdate(
        { _id: splitStockArray[1] },
        { $set: { amount: splitStockArray[0].amount } },
        { new: true, opts },
        (err, doc) => {
          winston.debug(doc);
        }
      )
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    }

    const userOptions =
      indexesWithReferenceIds.length > 0
        ? {
            $pullAll: { stocks: [indexesWithReferenceIds] },
            $set: { amount: balance },
          }
        : { $set: { amount: balance } };

    await User.findByIdAndUpdate(
      { _id: id },
      userOptions,
      { new: true, opts },
      function (err, data) {
        winston.debug(`Result from findByIdAndUpdate: ${data}`);
      }
    )
      .clone()
      .catch(function (err) {
        console.log(err);
      });

    if (indexesWithReferenceIds.length > 0) {
      await Stock.deleteMany(
        { _id: { $in: indexesWithReferenceIds } },
        function (err, result) {
          winston.debug(`Result from deleteMany: ${result} ${err}`);
        }
      )
        .clone()
        .catch(function (err) {
          winston.error(err);
        });
    }
    await session.commitTransaction();
    winston.debug("Commmitting transaction");
    res.status(200).json({ message: "Transaction approved" });
  } catch (err) {
    await session.abortTransaction();
    winston.debug("Aborting transaction");
    next(boom.badImplementation(`Database error: ${err}`));
  } finally {
    session.endSession();

    // User.findById({ _id: id }).exec((err, response) => {
    //   winston.debug(err, response);
    // });
  }
};

export default sellStock;
