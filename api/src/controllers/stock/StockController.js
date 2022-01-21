import sellStock from "./sell_stock";
import buyStock from "./buy_stock";
import getAll from "./get_all";
import getCurrentMarketPrice from "./get_current_market_price";
import specificStock from "./specific_stock";
import getCompanyInformation from "./get_company_information";
import getChartData from "./get_chart_data";
import getLatestData from "./get_latest_data";
import autocomplete from "./autocomplete";

const StockController = {
  sellStock,
  buyStock,
  getAll,
  getCurrentMarketPrice,
  specificStock,
  getCompanyInformation,
  getChartData,
  getLatestData,
  autocomplete,
};

export default StockController;
