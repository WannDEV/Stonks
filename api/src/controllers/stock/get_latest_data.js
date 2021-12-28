import boom from "@hapi/boom";
import axios from "axios";

import winston from "../../utils/logger/winston";

const getLatestData = async function (req, res, next) {
  const symbol = req.query.symbol.toUpperCase();

  const queryString = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?timeseries=1&apikey=${process.env.FMP_API_KEY}`;
  const response = await axios.get(queryString).catch((err) => {
    return next(
      boom.badImplementation(`Third party stock api call failed: ${err}`)
    );
  });

  const latestData = await response.data.historical;

  return res.status(200).json(latestData);
};

export default getLatestData;
