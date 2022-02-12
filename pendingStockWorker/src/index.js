// Import mongodb and create a connection
import { mongodb } from "./db/index";

// import interval methods
import checkPendingStocks from "./interval_methods/check_pending_stocks/index";

// connect to mongodb database
mongodb();

// run interval methods
checkPendingStocks();
