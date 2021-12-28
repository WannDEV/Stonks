import { getCurrentPrice } from "../../helpers/sortStocks";

const getCurrentMarketPrice = async function (req, res, next) {
  const stocks = req.body.stocks;

  if (!stocks)
    return res.status(400).json({ message: "No symbols were passed" });
  if (stocks.length > 10)
    return res.status(400).json({ message: "Too many symbols were passed" });

  // try {
  //   const modifiedResponse = getCurrentPrice(stocks);
  //   return res.status(200).json(modifiedResponse);
  // } catch (err) {
  //   return res.status(503).json({ message: "Something went wrong with api call to external api" });
  // }
  const modifiedResponse = getCurrentPrice(stocks);
  return res.status(200).json(modifiedResponse);
};

export default getCurrentMarketPrice;
