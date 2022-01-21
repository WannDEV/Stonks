import boom from "@hapi/boom";
const mongoose = require("mongoose");

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";
import User from "../../db/models/user";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const createGame = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;
  const allowedMarkets = req.body.allowedMarkets;
  const name = req.body.name;
  const commission = req.body.commission;
  const startBalance = req.body.startBalance;
  const startDate = req.body.startDate;
  const duration = req.body.duration;

  // check data
  if (typeof name === "string" || name != "") {
  } else {
    return next(
      boom.badData("Name has to be of type string and cannot be empty")
    );
  }

  if (typeof commission == "number" || commission >= 0) {
  } else {
    return next(
      boom.badData("Commission has to be of type number and cannot be negative")
    );
  }

  if (typeof startBalance == "number" || startBalance >= 0) {
  } else {
    return next(
      boom.badData(
        "Start balance has to be of type number and cannot be negative"
      )
    );
  }

  if (!(startDate instanceof Date)) {
  } else {
    return next(boom.badData("Start date has to be of type date"));
  }

  if (typeof duration == "number" || duration >= 0) {
  } else {
    return next(
      boom.badData("Duration has to be of type number and cannot be negative")
    );
  }

  if (Array.isArray(allowedMarkets)) {
  } else {
    return next(boom.badData("Banned markets needs to be an array"));
  }

  for (let i = 0; i < allowedMarkets.length; ++i) {
    if (typeof allowedMarkets[i] != "string")
      return next(boom.badData("Banned markets items has to be a string"));
  }

  const urlId = makeid(10);

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const opts = { session };
    const gameId = mongoose.Types.ObjectId();

    const user = await User.findOne({ _id: id }, null, opts);

    const game = new Game({
      _id: gameId,
      urlId,
      allowedMarkets,
      name,
      commission,
      startBalance,
      startDate,
      duration,
      owner: await user,
      users: [await user],
      balances: [{ userId: await user, balance: startBalance }],
    });

    const savedGame = await game.save();
    console.log(await savedGame);

    if (await savedGame) {
      if (await user) {
        await user.games.addToSet(await savedGame);
        await user.save();
      } else {
        return next(boom.badData("Could not find user"));
      }
    }

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

export default createGame;
