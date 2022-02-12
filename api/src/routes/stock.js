import StockController from "../controllers/stock/StockController";
import validateRequestJWT from "../helpers/token-validation";

const express = require("express");
const router = express.Router();

router.get(
  "/specific_stock",
  validateRequestJWT,
  StockController.specificStock
);
router.post("/buy_stock", validateRequestJWT, StockController.buyStock);
router.post("/sell_stock", validateRequestJWT, StockController.sellStock);
router.get("/get_company_information", StockController.getCompanyInformation);
router.get("/get_chart_data", StockController.getChartData);
router.get("/get_latest_data", StockController.getLatestData);
router.get("/autocomplete", StockController.autocomplete);
router.get("/get_stock_price", StockController.getStockPrice);
router.post("/cancel_stock", validateRequestJWT, StockController.cancelStock);
router.get(
  "/get_all_owned_stocks",
  validateRequestJWT,
  StockController.getAllOwnedStocks
);

module.exports = router;
