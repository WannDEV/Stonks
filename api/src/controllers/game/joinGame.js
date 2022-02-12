import boom from "@hapi/boom";
const mongoose = require("mongoose");

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";
import User from "../../db/models/user";

const joinGame = async function (req, res, next) {
  const urlId = req.body.urlId.toUpperCase();
  const id = res.locals.decodedAccessToken.id;

  // check if id is a string and not empty
  if (typeof urlId !== "string" || urlId == "")
    return next(
      boom.badData("urlId has to be of type string and cannot be empty")
    );

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    let gameId;

    const user = await User.findOne({ _id: id });

    if (await user) {
      const game = await Game.findOne({ urlId }, null, opts);

      if (await game) {
        gameId = await game._id;
        await game.users.addToSet(await user);
        await user.games.addToSet(await game);
        await game.balances.addToSet({
          userId: await user._id,
          balance: await game.startBalance,
          displayBalance: await game.startBalance,
        });
        await game.save();
        await user.save();
      } else return next(boom.badRequest("urlId does not exist"));
    } else return next(boom.badRequest("User could not be found"));

    await session.commitTransaction();
    winston.debug("Commmitting transaction");
    res.status(200).json({ gameId });
  } catch (err) {
    await session.abortTransaction();
    winston.debug("Aborting transaction");
    next(boom.badImplementation(`Database error: ${err}`));
  } finally {
    session.endSession();
  }
};

export default joinGame;
