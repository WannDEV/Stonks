import boom from "@hapi/boom";
import axios from "axios";
import stringSimilarity from "string-similarity";
import levenshtein from "js-levenshtein";

import winston from "../../utils/logger/winston";

function arrayMove(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}

const autocomplete = async function (req, res, next) {
  const search = req.query.search ? req.query.search.toUpperCase() : "";
  console.log("Autocomplete ran");

  if (search == "" || search == " " || !search) {
    return res.status(200).json([]);
  } else {
    const queryString = `https://financialmodelingprep.com/api/v3/search?query=${search}&limit=15&exchange=NASDAQ,COMMODITY,CRYPTO,FOREX,AMEX,NYSE&apikey=${process.env.FMP_API_KEY}`;

    const response = await axios.get(queryString).catch((err) => {
      return next(
        boom.badImplementation(`Third party stock api call failed: ${err}`)
      );
    });

    const rawAutocompleteSuggestions = await response.data;
    let autocompleteSuggestions = [];

    // filter away name if null
    for (let i = 0; i < rawAutocompleteSuggestions.length; ++i) {
      if (rawAutocompleteSuggestions[i].name != null) {
        autocompleteSuggestions.push(rawAutocompleteSuggestions[i]);
      }
    }

    console.log(autocompleteSuggestions);

    for (let i = 0; i < autocompleteSuggestions.length; ++i) {
      // give rating
      let rating = stringSimilarity.compareTwoStrings(
        search,
        autocompleteSuggestions[i].name.toUpperCase()
      );

      if (
        search ==
        autocompleteSuggestions[i].name
          .substring(0, search.length)
          .toUpperCase()
      )
        rating += 0.45; // boost rating if first letters are an accurate string match

      if (search == autocompleteSuggestions[i].symbol.toUpperCase())
        rating += 0.2; // boost rating if symbol is an accurate match

      rating +=
        0.6 /
        levenshtein(search, autocompleteSuggestions[i].name.toUpperCase()); // higher rating if levenshtein fuzzy search is precise

      autocompleteSuggestions[i] = {
        ...autocompleteSuggestions[i],
        accuracy: rating,
      };
    }

    const similaritySortedAutocompleteSuggestions =
      autocompleteSuggestions.sort((a, b) => {
        if (!a.accuracy && a.accuracy != 0) {
          // Change this values if you want to put `null` values at the end of the array
          return -1;
        }

        if (!b.accuracy && b.accuracy != 0) {
          // Change this values if you want to put `null` values at the end of the array
          return +1;
        }

        return a.accuracy > b.accuracy ? -1 : 1;
      });

    return res
      .status(200)
      .json(similaritySortedAutocompleteSuggestions.slice(0, 6));
  }
};

export default autocomplete;
