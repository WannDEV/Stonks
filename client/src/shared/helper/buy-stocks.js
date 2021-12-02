import api from "../../services/api";

const purchaseStocks = async (amount, symbol) => {
  console.log(amount, symbol);
  await api
    .post("/stock/buy_stock", {
      amount,
      symbol,
    })
    .then((response) => {
      console.log(response);
      // Redirect to dashboard if transaction is approved and throw "Not enough money" error if declined
      // Above comment needs to be done inside axios interceptor
    });
};

export default purchaseStocks;
