import boom from "@hapi/boom";

import winston from "../../utils/logger/winston";
import Game from "../../db/models/game";
import User from "../../db/models/user";
import Stock from "../../db/models/stock";

const getLeaderboard = async function (req, res, next) {
  const gameId = req.query.gameId;

  // get populated stocks and populated user to retrieve name
  const populatedStocks = await Game.findOne({ _id: gameId })
    .populate({
      path: "stocks",
      model: "Stock",
    })
    .populate({
      path: "stocks.user",
      model: "User",
    })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  // find all symbols and get the price for each

  // split populated stocks into a list with sub lists

  // loop through each sub list and calculate total, amount of tades, change, and get name and userId

  // sort by total (largest to smallest number)

  winston.debug(`populated stocks: ${populatedStocks}`);

  return res.status(200).json({ data: await populatedStocks });
};

export default getLeaderboard;
