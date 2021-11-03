import StockController from "../controllers/StockController";

const express = require("express");
const router = express.Router();

router.get("/all/owned", StockController.getAll);
router.get("/current_market_price", StockController.getCurrentMarketPrice);

module.exports = router;
