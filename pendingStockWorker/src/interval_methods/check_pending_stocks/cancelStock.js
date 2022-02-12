import mongoose from "mongoose";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";

const cancelStock = async (cancelStock) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };

    const gameResponse = await Game.findOne(
      { _id: cancelStock.game },
      null,
      opts
    ).catch((err) => {});
    const game = await gameResponse;

    if (game) {
      // delete process for pending stock
      cancelStock
        .deleteOne({ _id: cancelStock._id })
        .catch((err) => winston.debug(err));

      await game.pending_stocks.pull(cancelStock._id);

      // find user balance and update
      for (let i = 0; i < game.balances.length; ++i) {
        if (game.balances[i].userId == cancelStock.user.toString()) {
          game.balances[i].balance += cancelStock.spending_price;
          break;
        }
      }

      await game.save();
    }

    winston.debug("Committing transaction");
  } catch (err) {
    await session.abortTransaction();
    winston.error(`Aborting transaction: ${err}`);
  } finally {
    await session.endSession();
  }
};

export default cancelStock;
