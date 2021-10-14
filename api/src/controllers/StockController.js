import User from "../db/models/user";

const sortStockResponse = (data) => {
  const stocks = data.stocks;
  // const newStocks = [];
  // const temporaryStocks = {
  //   price_at_purchase: 0,
  //   amount: 0,
  //   symbol: null,
  // };

  // for (let i = 0; i < stocks.length; ++i) {
  //   console.log(i);
  //   for (let j = 0; j < stocks.length; ++j) {
  //     if (i.symbol == j.symbol) {
  //       temporaryStocks.symbol = i.symbol;
  //       temporaryStocks.price_at_purchase += j.price_at_purchase;
  //       temporaryStocks.amount += j.amount;

  //       stocks.slice(j, 1);
  //     }
  //     newStocks.push(temporaryStocks);
  //   }
  // }

  // console.log(stocks, typeof stocks);
  // console.log(`newStocks: ${newStocks}`);

  let result = stocks.map((a) => a);
  console.log(result);
};

const StockController = {
  async getAll(req, res, next) {
    const id = res.locals.decodedAccessToken.id;

    User.findOne({ _id: id })
      .populate({
        path: "stocks",
        model: "Stock",
      })
      .exec((err, stock) => {
        if (err)
          return res.status(500).json({ message: "Something went wrong" });
        sortStockResponse(stock);
        return res.status(200).json(stock);
      });
  },
};

export default StockController;
