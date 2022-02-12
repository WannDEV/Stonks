import axios from "axios";
import winston from "../logger/winston";

const populateStocks = async (stocks) => {
  var symbolsString = "";

  for (let i = 0; i < stocks.length; ++i) {
    symbolsString += stocks[i].symbol + ",";
  }
  symbolsString = symbolsString.substring(0, symbolsString.length - 1); // Removes last comma from string of symbols

  const queryString = `https://financialmodelingprep.com/api/v3/quote-short/${symbolsString}?apikey=${process.env.FMP_API_KEY}`;

  await axios.get(queryString).then((response) => {
    var oldStockValue = 0;
    var newStockValue = 0;
    var change = 0;
    stocks.forEach((stock, index) => {
      // (stocks.amount * price) / (stocks.value / stocks.amount) * 100
      oldStockValue = stock.sharePrice;

      // api sorts stock in alphabetic order so it needs to find the right value
      const correctPriceObj = response.data.find(
        (o) => o.symbol == stock.symbol
      );

      newStockValue = correctPriceObj.price;
      change = newStockValue / oldStockValue || 0;

      // winston.debug(`${oldStockValue}, ${newStockValue}, ${change}`);

      stock.change = change == 0 ? 0 : change * 100 - 100; // Result in percentage
      stock.newSharePrice = newStockValue; // new total worth for stock
    });
    // winston.debug(stocks);
  });

  return stocks;
};

const sortStockResponse = (stocks) => {
  var finalArr = [];

  let dupes = {};

  // Check if duplicates exists in array and add index if true
  stocks.forEach((item, index) => {
    dupes[item.symbol] = dupes[item.symbol] || [];
    dupes[item.symbol].push(index);
  });

  if (dupes) {
    // if there're multiple of each stocks
    var price = 0;
    var amount = 0;
    var name = "";
    for (const symbol in dupes) {
      for (let i = 0; i < dupes[symbol].length; ++i) {
        const index = dupes[symbol][i];
        price += stocks[index].amount * stocks[index].price_at_purchase;
        amount += stocks[index].amount;
        name = stocks[index].name;
      }
      finalArr.push({
        symbol,
        sharePrice: price / amount,
        amount,
        name,
      });
      price = 0;
      amount = 0;
      name = "";
    }
  } else {
    // If every stock is unique
    finalArr = stocks.map((i) => {
      return {
        symbol: i["symbol"],
        sharePrice: i["price_at_purchase"],
        amount: i["amount"],
        name: i["name"],
      };
    });
  }

  return finalArr;
};

module.exports = {
  sortStockResponse,
  populateStocks,
};
