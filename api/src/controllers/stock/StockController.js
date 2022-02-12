import sellStock from "./sell_stock";
import buyStock from "./buy_stock";
import specificStock from "./specific_stock";
import getCompanyInformation from "./get_company_information";
import getChartData from "./get_chart_data";
import getLatestData from "./get_latest_data";
import autocomplete from "./autocomplete";
import getStockPrice from "./get_stock_price";
import cancelStock from "./cancel_stock";
import getAllOwnedStocks from "./get_all_owned_stocks";

const StockController = {
  sellStock,
  buyStock,
  specificStock,
  getCompanyInformation,
  getChartData,
  getLatestData,
  autocomplete,
  getStockPrice,
  cancelStock,
  getAllOwnedStocks,
};

export default StockController;
