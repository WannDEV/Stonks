import winston from "../../utils/logger/winston";
import PendingStock from "../../db/models/pendingStock";
import buyStock from "./buyStock";
import sellStock from "./sellStock";
import cancelStock from "./cancelStock";

const checkPendingStocks = async () => {
  setInterval(async function () {
    const pendingStocksResponse = await PendingStock.find({}).catch((err) =>
      winston.error("Could not fetch pending buy stocks")
    );

    const pendingStocks = pendingStocksResponse;
    const now = new Date();

    for (let i = 0; i < pendingStocks.length; ++i) {
      if (
        now >= pendingStocks[i].active_from &&
        !pendingStocks[i].is_cancelled
      ) {
        if (pendingStocks[i].trade_type == "buy")
          await buyStock(pendingStocks[i]);
        if (pendingStocks[i].trade_type == "sell")
          await sellStock(pendingStocks[i]);
      } else if (
        pendingStocks[i].is_cancelled &&
        now >= pendingStocks[i].cancellation_at
      ) {
        await cancelStock(pendingStocks[i]);
      }
    }
    winston.debug("Check pending stocks ran");
  }, 5 * 1000); // 60 * 1000 milsec = 60 seconds
};

export default checkPendingStocks;
