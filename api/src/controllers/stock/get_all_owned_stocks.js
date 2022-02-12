import boom from "@hapi/boom";

import Game from "../../db/models/game";
import Stock from "../../db/models/stock";
import winston from "../../utils/logger/winston";
import {
  sortStockResponse,
  populateStocks,
} from "../../utils/sort_stocks/sortStocks";

const getAllOwnedStocks = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;
  const gameId = req.query.gameId;

  const gameResponse = await Game.findOne({ _id: gameId })
    .populate({ path: "stocks", model: "Stock" })
    .catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

  const game = await gameResponse;

  if (game) {
    let stocks = [];

    // find all stocks the user owns
    for (let i = 0; i < game.stocks.length; ++i) {
      if (id == game.stocks[i].user.toString()) stocks.push(game.stocks[i]);
    }

    // check if user owns any stocks
    if (stocks.length == 0) return res.status(200).json([]);

    // sort stocks
    const sortedStocks = sortStockResponse(stocks);

    // poppulate stocks with the necessary information
    const sortedStocksWithPrice = populateStocks(sortedStocks).catch((err) => {
      return next(boom.badImplementation(`Database error: ${err}`));
    });

    return res.status(200).json(await sortedStocksWithPrice);
  } else return next(boom.badRequest("Could not find game"));
};

export default getAllOwnedStocks;
