import boom from "@hapi/boom";
import axios from "axios";

import winston from "../../utils/logger/winston";

const getCompanyInformation = async function (req, res, next) {
  const symbol = req.query.symbol;

  if (!symbol) return next(boom.badData("No symbol was provided"));

  const response = await axios
    .get(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${process.env.FMP_API_KEY}`
    )
    .catch((err) => {
      return next(
        boom.badImplementation(`Third party stock api call failed: ${err}`)
      );
    });

  const companyInformation = await response.data;

  // console.log(companyInformation);

  return res.status(200).json(companyInformation);
};

export default getCompanyInformation;
