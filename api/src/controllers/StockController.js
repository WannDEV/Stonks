import axios from "axios";
import boom from "@hapi/boom";
import mongoose from "mongoose";

import User from "../db/models/user";
import Stock from "../db/models/stock";
import { sortStockResponse, getCurrentPrice } from "../helpers/sortStocks";
import winston from "../utils/logger/winston";

const StockController = {
  async getAll(req, res, next) {
    const id = res.locals.decodedAccessToken.id;

    const user = await User.findByIdAndUpdate({ _id: id }).catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

    const userHasStocks = (await user.stocks.length) > 0;

    if (userHasStocks) {
      try {
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.skip);

        await User.findOne({ _id: id })
          .populate({
            path: "stocks",
            model: "Stock",
          })
          .skip(offset)
          .limit(limit)
          .exec((err, stocksCollection) => {
            const sortedStocksCollection = sortStockResponse(stocksCollection);
            getCurrentPrice(sortedStocksCollection).then((stocks) => {
              const stocksCollectionCount = stocks.length;

              const totalPages = Math.ceil(stocksCollectionCount / limit);
              const currentPage = 0;
              if (offset > 0) {
                currentPage = Math.ceil(stocksCollectionCount % offset);
              }

              // winston.debug(`${stocks}, ${stocksCollectionCount}, ${currentPage}, ${totalPages}`);
              res.status(200).send({
                data: stocks,
                paging: {
                  total: stocksCollectionCount,
                  page: currentPage,
                  pages: totalPages,
                },
              });
            });
          });
      } catch (e) {
        winston.error(e);
        return next(boom.badImplementation(`Unexpected error: ${e}`));
      }
    } else {
      return next(boom.notAcceptable("User doesn't have any stocks"));
    }
  },
  async getCurrentMarketPrice(req, res, next) {
    const stocks = req.body.stocks;

    if (!stocks)
      return res.status(400).json({ message: "No symbols were passed" });
    if (stocks.length > 10)
      return res.status(400).json({ message: "Too many symbols were passed" });

    // try {
    //   const modifiedResponse = getCurrentPrice(stocks);
    //   return res.status(200).json(modifiedResponse);
    // } catch (err) {
    //   return res.status(503).json({ message: "Something went wrong with api call to external api" });
    // }
    const modifiedResponse = getCurrentPrice(stocks);
    return res.status(200).json(modifiedResponse);
  },
  async specificStock(req, res, next) {
    // make api call to stock api and return data

    // dummy data
    const name = "Tesla";
    const price = 123;
    const stockCandle = [
      {
        symbol: "tsla",
        price: 1239,
        // ...
      },
      {
        symbol: "tsla",
        price: 1139,
        // ...
      },
      {
        symbol: "tsla",
        price: 1339,
        // ...
      },
    ];

    return res.status(200).json({ name, price, stockCandle });
  },
  async buyStock(req, res, next) {
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
          if (err)
            return next(boom.badImplementation(`Database error: ${err}`));
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
  },
  async sellStock(req, res, next) {
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
  },
};

export default StockController;

/**
 * TODO:
 * - fix sell route
 * Current problems:
 * - When replacing entire array, it only removes the reference
 * Can't sell excact amount of stocks you own (not enough stocks error)
 * Way to fix it:
 * - Instead of modifying tempStocks, modify db array directly by first split any stocks that needs it and lastly remove indexes
 */
