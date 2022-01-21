import boom from "@hapi/boom";
const mongoose = require("mongoose");

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";

const getBasicGameInfo = async function (req, res, next) {
  const urlId = req.query.gameId;

  const game = await Game.findOne({ urlId });

  if (await game) {
    return res.status(200).json({
      name: game.name,
      commission: game.commission,
      startBalance: game.startBalance,
      startDate: game.startDate,
      duration: game.duration,
      allowedMarkets: game.allowedMarkets,
      id: game._id,
    });
  } else return next(boom.badData("Game could not be found"));
};

export default getBasicGameInfo;
