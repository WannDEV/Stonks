import api from "../services/api";

const fetchAllStocks = async () => {
  const { data } = await api.get("/stock/all");
  const stocks = data.stocks;
  console.log(stocks[0].symbol);
};

const AllStocksButton = () => {
  return <button onClick={fetchAllStocks}>Get all stocks</button>;
};

export default AllStocksButton;
