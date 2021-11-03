import User from "../db/models/user";
import { sortStockResponse, getCurrentPrice } from "../helpers/sortStocks";

const StockController = {
  async getAll(req, res, next) {
    const id = res.locals.decodedAccessToken.id;
    try {
      const limit = parseInt(req.query.limit);
      const offset = parseInt(req.query.skip);
  
      await User.findOne({ _id: id })
      .populate({
        path: "stocks",
        model: "Stock",
      }).skip(offset).limit(limit).exec((err, stocksCollection) => {

        const sortedStocksCollection = sortStockResponse(stocksCollection);
        getCurrentPrice(sortedStocksCollection).then(stocks => {

          const stocksCollectionCount = stocks.length;
  
          const totalPages = Math.ceil(stocksCollectionCount / limit);
          const currentPage = 0;
          if (offset > 0) {
            currentPage = Math.ceil(stocksCollectionCount % offset);
          }

          console.log(stocks, stocksCollectionCount, currentPage, totalPages);
          res.status(200).send({
            data: stocks,
            paging: {
              total: stocksCollectionCount,
              page: currentPage,
              pages: totalPages,
            },
          });
        });
        })
    } catch (e) {
      console.log("Error", e);
      res.status(500).send({
        data: null,
      });
    }


    // User.findOne({ _id: id })
    //   .populate({
    //     path: "stocks",
    //     model: "Stock",
    //   })
    //   .exec((err, stock) => {
    //     if (err)
    //       return res.status(500).json({ message: "Something went wrong" });
    //     const sortedStocks = sortStockResponse(stock);
    //     getCurrentPrice(sortedStocks).then(response => {
    //       return res.status(200).json(response)
    //     });
    //   });
  },
  async getCurrentMarketPrice(req, res, next) {
    const stocks = req.body.stocks;

    if (!stocks) return res.status(400).json({ message: "No symbols were passed" });
    if (stocks.length > 10) return res.status(400).json({ message: "Too many symbols were passed" });

    // try {
    //   const modifiedResponse = getCurrentPrice(stocks);
    //   return res.status(200).json(modifiedResponse);
    // } catch (err) {
    //   return res.status(503).json({ message: "Something went wrong with api call to external api" });
    // }
    const modifiedResponse = getCurrentPrice(stocks);
    return res.status(200).json(modifiedResponse);
  }
};

export default StockController;
