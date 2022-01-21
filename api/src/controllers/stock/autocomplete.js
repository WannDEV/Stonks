import boom from "@hapi/boom";
import axios from "axios";

import winston from "../../utils/logger/winston";

const autocomplete = async function (req, res, next) {
  const search = req.query.search;
  console.log(search.toUpperCase());

  const queryString = `https://financialmodelingprep.com/api/v3/search?query=${search.toUpperCase()}&limit=15&exchange=NASDAQ,ETF,COMMODITY,CRYPTO,FOREX,AMEX,NYSE&apikey=${
    process.env.FMP_API_KEY
  }`;

  const response = await axios.get(queryString).catch((err) => {
    return next(
      boom.badImplementation(`Third party stock api call failed: ${err}`)
    );
  });

  const autocompleteSuggestions = await response.data;

  const sortedAutocompleteSuggestions = autocompleteSuggestions.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  console.log(sortedAutocompleteSuggestions);

  return res.status(200).json(sortedAutocompleteSuggestions.slice(0, 6));
};

export default autocomplete;
