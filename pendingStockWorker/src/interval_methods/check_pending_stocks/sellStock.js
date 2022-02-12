import axios from "axios";
import mongoose from "mongoose";

import Stock from "../../db/models/stock";
import Game from "../../db/models/game";
import PendingStock from "../../db/models/pendingStock";

import winston from "../../utils/logger/winston";

const sellStock = async function (pendingStock) {
  const symbol = pendingStock.symbol;
  const market = pendingStock.market;
  const gameId = pendingStock.game;
  const id = pendingStock.user;
  const spendingPrice = pendingStock.spending_price;

  const gameResponse = await Game.findOne({ _id: gameId })
    .populate({ path: "stocks", model: "Stock" })
    .catch((err) => {
      return winston.error(`Database error: ${err}`);
    });

  const game = await gameResponse;

  if (game) {
    let ownedStocks = [];
    let displayBalance = 0;
    let balance = 0;

    // find all stocks the user owns
    for (let i = 0; i < game.stocks.length; ++i) {
      if (id == game.stocks[i].user.toString())
        ownedStocks.push(game.stocks[i]);
    }

    // check if user owns any stocks
    if (ownedStocks.length == 0)
      return winston.debug("User does not have any stocks");

    // find user display balance
    for (let i = 0; i < game.balances.length; ++i) {
      if (id.toString() == game.balances[i].userId) {
        displayBalance = game.balances[i].displayBalance;
        balance = game.balances[i].balance;
      }
    }

    let referenceIds = [];

    for (let i = 0; i < game.stocks.length; ++i) {
      referenceIds.push(game.stocks[i]._id);
    }

    const queryString = `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${process.env.FMP_API_KEY}`;
    const response = await axios.get(queryString).catch((err) => {
      return winston.debug(`Third party api call failed: ${err}`);
    });

    const stockPrice = await response.data[0].price;
    const commission = game.commission;

    const earnings =
      commission == 0 ? spendingPrice : spendingPrice * (1 - commission);

    balance += earnings;
    displayBalance += earnings;

    const amount = spendingPrice / stockPrice;

    // Figure out if user has enough stocks to sell
    let tempCounter = 0;
    for (let i = 0; i < ownedStocks.length; ++i) {
      if (ownedStocks[i].symbol == symbol) tempCounter += ownedStocks[i].amount;
    }
    if (tempCounter < amount) {
      await Stock.findByIdAndDelete(pendingStock._id).catch((err) => {});

      await game.pending_stocks.pull(pendingStock._id);
      await game.save();

      return winston.debug("User does not have enough stocks to sell");
    }

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

      const gameOptions =
        indexesWithReferenceIds.length > 0
          ? {
              $pullAll: { stocks: [indexesWithReferenceIds] },
              $set: {
                "balances.$.displayBalance": displayBalance,
                "balances.$.balance": balance,
              },
            }
          : {
              $set: {
                "balances.$.displayBalance": displayBalance,
                "balances.$.balance": balance,
              },
            };

      await Game.findOneAndUpdate(
        { _id: gameId, "balances.userId": id },
        gameOptions,
        { new: true, opts },
        function (err, data) {}
      )
        .clone()
        .catch(function (err) {
          console.log(err);
        });

      if (indexesWithReferenceIds.length > 0) {
        await Stock.deleteMany(
          { _id: { $in: indexesWithReferenceIds } },
          function (err, result) {}
        )
          .clone()
          .catch(function (err) {
            winston.error(err);
          });

        await Game.findByIdAndUpdate(pendingStock._id, {
          $pull: { stocks: { _id: { $in: indexesWithReferenceIds } } },
        });
      }

      await PendingStock.findByIdAndRemove(pendingStock._id).catch((err) =>
        winston.error(err)
      );
      await game.pending_stocks.pull(pendingStock._id);
      await game.save();

      await session.commitTransaction();
      winston.debug("Commmitting transaction");
    } catch (err) {
      await session.abortTransaction();
      winston.debug("Aborting transaction");
    } finally {
      session.endSession();
    }
  } else winston.debug("Could not find game");
};

export default sellStock;
