import boom from "@hapi/boom";
import axios from "axios";

const getStockPrice = async function (req, res, next) {
  const symbol = req.query.symbol;

  const queryString = `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${process.env.FMP_API_KEY}`;
  const response = await axios.get(queryString).catch((err) => {
    return next(
      boom.badImplementation(`Third party stock api call failed: ${err}`)
    );
  });

  const stock = await response.data[0];

  if (stock) return res.status(200).json(stock);
  else next(boom.badImplementation("Something went wrong"));
};

export default getStockPrice;
