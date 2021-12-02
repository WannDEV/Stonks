import StockController from "../controllers/StockController";

const express = require("express");
const router = express.Router();

router.get("/all/owned", StockController.getAll);
router.get("/current_market_price", StockController.getCurrentMarketPrice);
router.get("/specific_stock", StockController.specificStock);
router.post("/buy_stock", StockController.buyStock);
router.post("/sell_stock", StockController.sellStock);

module.exports = router;
