const express = require("express");
const router = express.Router();

import validateRequestJWT from "../helpers/token-validation";
import auth from "./auth";
import test from "./test";
import stock from "./stock";

router.get("/", (req, res) =>
  res.send("Welcome to my Google Oauth express server")
);

router.use("/oauth", auth);
router.use("/test", test);
router.use("/stock", validateRequestJWT, stock);

router.post("/testroute", validateRequestJWT, (req, res) => {
  res.status(200).json({ message: "Access granted to this ressource" });
});

export default router;
