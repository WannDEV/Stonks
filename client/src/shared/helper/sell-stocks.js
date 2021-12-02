import api from "../../services/api";

const sellStocks = async (amount, symbol) => {
  console.log(amount, symbol);

  await api
    .post("/stock/sell_stock", {
      amount,
      symbol,
    })
    .then((response, err) => {
      console.log(response, err, typeof response);
      if (response) return true;
      return false;
    });
};

export default sellStocks;
