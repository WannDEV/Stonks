import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";

const getPopulatedGame = async function (req, res, next) {
  const gameId = req.query.gameId;

  const populatedGame = await Game.findOne({ _id: gameId })
    .populate({ path: "users", model: "User" })
    .populate({ path: "stocks", model: "Stock" })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  if (await populatedGame) {
    return res.status(200).json(populatedGame);
  } else return next(boom.badImplementation("Something went wrong"));
};

export default getPopulatedGame;
