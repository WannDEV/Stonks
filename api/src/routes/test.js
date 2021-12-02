import TestController from "../controllers/TestController";
import validateRequestJWT from "../helpers/token-validation";

const express = require("express");
const router = express.Router();

// router.use(validateRequestJWT);

router.get("/testfetch", TestController.testFetch);
router.get("/testerror", TestController.testError);

module.exports = router;
