import StockController from "../controllers/StockController";

const express = require("express");
const router = express.Router();

router.get("/all", StockController.getAll);

module.exports = router;
