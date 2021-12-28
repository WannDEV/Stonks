import boom from "@hapi/boom";

import User from "../../db/models/user";
import { sortStockResponse, getCurrentPrice } from "../../helpers/sortStocks";
import winston from "../../utils/logger/winston";

const getAll = async function (req, res, next) {
  const id = res.locals.decodedAccessToken.id;

  const user = await User.findByIdAndUpdate({ _id: id }).catch((err) => {
    return next(boom.badImplementation(`Database error: ${err}`));
  });

  const userHasStocks = (await user.stocks.length) > 0;

  if (userHasStocks) {
    try {
      const limit = parseInt(req.query.limit);
      const offset = parseInt(req.query.skip);

      await User.findOne({ _id: id })
        .populate({
          path: "stocks",
          model: "Stock",
        })
        .skip(offset)
        .limit(limit)
        .exec((err, stocksCollection) => {
          const sortedStocksCollection = sortStockResponse(stocksCollection);
          getCurrentPrice(sortedStocksCollection).then((stocks) => {
            const stocksCollectionCount = stocks.length;

            const totalPages = Math.ceil(stocksCollectionCount / limit);
            const currentPage = 0;
            if (offset > 0) {
              currentPage = Math.ceil(stocksCollectionCount % offset);
            }

            // winston.debug(`${stocks}, ${stocksCollectionCount}, ${currentPage}, ${totalPages}`);
            res.status(200).send({
              data: stocks,
              paging: {
                total: stocksCollectionCount,
                page: currentPage,
                pages: totalPages,
              },
            });
          });
        });
    } catch (e) {
      winston.error(e);
      return next(boom.badImplementation(`Unexpected error: ${e}`));
    }
  } else {
    return next(boom.notAcceptable("User doesn't have any stocks"));
  }
};

export default getAll;
