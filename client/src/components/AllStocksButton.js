import api from "../services/api";

const fetchAllStocks = async () => {
  const { data } = await api.get("/stock/all");
  const stocks = data;
  console.log(stocks);
};

const AllStocksButton = () => {
  return <button onClick={fetchAllStocks}>Get all stocks</button>;
};

export default AllStocksButton;
