import TestController from "../controllers/TestController";
import validateRequestJWT from "../helpers/token-validation";

const express = require("express");
const router = express.Router();

router.use(validateRequestJWT);

router.get("/testfetch", TestController.testFetch);

module.exports = router;
