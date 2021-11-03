import axios from "axios";

const getCurrentPrice = async (stocks) => {

    //Save the line below for client side logic
    const numberOfLoops = stocks.length > 10 ? 10 : stocks.length; // Yahoo finance api limit amount of symbols to 10 per request
    var symbolsString = "";

    for (let i = 0; i < numberOfLoops; ++i) {
        symbolsString += stocks[i].symbol + ",";
    }
    symbolsString = symbolsString.substring(0, symbolsString.length - 1); // Removes last comma from string of symbols

    const queryString = "https://query1.finance.yahoo.com/v7/finance/quote?region=US&lang=en&symbols=" + symbolsString;


    await axios.get(queryString).then(response => {
        var oldStockValue = 0;
        var newStockValue = 0;
        var change = 0;
        stocks.forEach((stock, index) => {
            // (stocks.amount * price) / (stocks.value / stocks.amount) * 100
            oldStockValue = stock.price / stock.amount;
            newStockValue = response.data.quoteResponse.result[index].regularMarketPrice;
            change = (newStockValue / oldStockValue);

            console.log(oldStockValue, newStockValue, change);

            stock.change = change * 100 - 100 // Result in percentage
        });
        console.log(stocks);
    });
    
    return stocks;
};

const sortStockResponse = (data) => {
    const stocks = data.stocks;
    
    var finalArr = [];
  
    let dupes = {};
  
    // Check if duplicates exists in array and add index if true
    stocks.forEach((item,index) => {
        dupes[item.symbol] = dupes[item.symbol] || [];
        dupes[item.symbol].push(index);
      });     
  
    if (dupes) { // if there're multiple of each stocks
        var price = 0;
        var amount = 0;
        for (const symbol in dupes) {        
            for (let i = 0; i < dupes[symbol].length; ++i) {
                const index = dupes[symbol][i];
                price += stocks[index].amount * stocks[index].price_at_purchase;
                amount += stocks[index].amount;
            }
            finalArr.push({
                symbol,
                price,
                amount
            });
            price = 0;
            amount = 0;
        };
    } else { // If every stock is unique
        finalArr = stocks.map(i => {
            return {
                symbol: i["symbol"],
                price: i["amount"] * i["price_at_purchase"],
                amount: i["amount"]
            };
        });
    }

    return finalArr;
};

module.exports = {
    sortStockResponse,
    getCurrentPrice
};