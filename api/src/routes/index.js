const express = require("express");
const router = express.Router();

// import validateRequestJWT from "../helpers/token-validation";
import auth from "./auth";
import stock from "./stock";
import game from "./game";

router.get("/", (req, res) =>
  res.send("Welcome to my Google Oauth express server")
);

router.use("/oauth", auth);
router.use("/stock", stock);
router.use("/game", game);

export default router;
