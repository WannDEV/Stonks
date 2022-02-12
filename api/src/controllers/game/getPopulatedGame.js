import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";

const getPopulatedGame = async function (req, res, next) {
  const gameId = req.query.gameId;
  const id = res.locals.decodedAccessToken.id;

  const populatedGame = await Game.findOne({ _id: gameId })
    .populate({ path: "users", model: "User" })
    .populate({ path: "stocks", model: "Stock" })
    .populate({ path: "pending_stocks", model: "PendingStock" })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  if (await populatedGame) {
    for (let i = 0; i < populatedGame.users.length; ++i) {
      if (id == populatedGame.users[i]) {
        return next(boom.badRequest("User is not participating in this game"));
      }

      if (i == populatedGame.users.length - 1)
        return res.status(200).json(populatedGame);
    }
  } else return next(boom.badImplementation("Something went wrong"));
};

export default getPopulatedGame;
