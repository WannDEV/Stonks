import mongoose from "mongoose";
import axios from "axios";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";
import Stock from "../../db/models/stock";
import FailedStock from "../../db/models/failedStock";
import PendingStock from "../../db/models/pendingStock";

const buyStock = async (buyStock) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };

    const gameResponse = await Game.findOne(
      { _id: buyStock.game },
      null,
      opts
    ).catch((err) => {});
    const game = await gameResponse;
    let userDisplayBalance;
    let displayBalanceIndex;

    if (game) {
      for (let i = 0; i < game.balances.length; ++i) {
        if (game.balances[i].userId == buyStock.user.toString()) {
          displayBalanceIndex = i;
          userDisplayBalance = game.balances[i].displayBalance;
        }
      }

      const commission = game.commission;
      const spendingPrice = buyStock.spending_price;

      const spendingPriceAfterCommission =
        spendingPrice * (1 - commission / 100);

      const stockPriceResponse = await axios
        .get(
          `https://financialmodelingprep.com/api/v3/quote-short/${buyStock.symbol}?apikey=${process.env.FMP_API_KEY}`
        )
        .catch((err) => console.log(err));

      console.log(`stockPriceResponse: ${await stockPriceResponse}`);

      const stockPrice =
        (await stockPriceResponse.data.length) > 0
          ? await stockPriceResponse.data[0].price
          : null;

      if (stockPrice) {
        if (spendingPrice < userDisplayBalance) {
          const amount = spendingPriceAfterCommission / stockPrice;

          const stock = new Stock({
            price_at_purchase: stockPrice,
            amount,
            symbol: buyStock.symbol,
            market: buyStock.market,
            game: buyStock.game,
            user: buyStock.user,
            active_from: buyStock.active_from,
            name: buyStock.name,
            img: buyStock.img,
          });

          await stock.save();

          await game.pending_stocks.pull(buyStock._id);
          await game.stocks.addToSet(stock);
          game.balances[displayBalanceIndex].displayBalance =
            userDisplayBalance - spendingPrice;

          console.log(
            userDisplayBalance - spendingPrice,
            game.balances[displayBalanceIndex]
          );

          await game.save();

          PendingStock.deleteOne({ _id: buyStock._id }).catch((err) => {});
        }
      } else {
        const failedStock = new FailedStock({
          _id: pendingBuyStock._id,
          spending_price: spendingPrice,
          symbol: buyStock.symbol,
          market: buyStock.market,
          game: buyStock.game,
          failed_at: buyStock.active_from,
        });

        await game.pending_stocks.pull(buyStock._id);
        await game.save();

        PendingStock.deleteOne({ _id: buyStock._id }).catch((err) => {});

        await failedStock.save();
      }
    }

    await session.commitTransaction();
    winston.debug("Commmitting transaction");
  } catch (err) {
    await session.abortTransaction();
    winston.debug(`Aborting transaction: ${err}`);
  } finally {
    await session.endSession();
  }
};

// const pendingBuyStockEmitter = PendingBuyStock.watch();

// pendingBuyStockEmitter.on("insert", (change) => {
//   const newStock = change.fullDocument;

//   const now = new Date();

//   if (now >= newStock.active_from) {
//     buyStock(newStock);
//   }
// });

export default buyStock;
