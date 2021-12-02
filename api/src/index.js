import cors from "cors";
import { stderrStream, stdoutStream } from "./utils/logger/morgan";
import winston from "./utils/logger/winston";
import express from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import asyncMiddleware from "./utils/error_handling/asyncMiddleware";
import clientErrorHandler from "./utils/error_handling/clientErrorHandler";
import serverErrorHandler from "./utils/error_handling/serverErrorHandler";
import {
  errorDecorator,
  finalErrorHandler,
  notFoundErrorHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} from "./utils/error_handling/errorMiddleware";

const app = express();

// Allow requests to be sent from same origin
app.use(cors({ origin: true, credentials: true }));

//Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded());

// Morgan logger
app.use(stderrStream, stdoutStream);

// Parse cookies from requests
app.use(cookieParser());

// Allow requests blocked by cors (By default, cors blocks requests which contains cookes and etc)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

// Helps secure Express app by setting various HTTP headers
app.use(helmet());

// Get NODE_ENV from environment and store in Express
app.set("env", process.env.NODE_ENV);

// Import mongodb and create a connection
import { mongodb } from "./db/index";

mongodb();

// Communicate with Google's sign in functionality
import "./services/google";

// Import all routes
app.use(router);

/**
 * START: Error handling
 * NOTE: To change or modify the error handling, go to index.js in the error_handling folder
 */
// Wrapper for catching all unexpected 500 errors
app.use(asyncMiddleware);

// Custom client and server error handlers
app.use(clientErrorHandler);
app.use(serverErrorHandler);

/**
 * Catch 404 and forward to error handler
 */
app.use(notFoundErrorHandler);

/**
 * The 'unhandledRejection' event is emitted whenever a Promise is rejected and
 * no error handler is attached to the promise.
 */
process.on("unhandledRejection", unhandledRejectionHandler);

/**
 * The 'uncaughtException' event is emitted when an uncaught JavaScript exception
 * bubbles all the way back to the event loop omitting Express.js error handler.
 *
 * !!! WARNING !!!
 * It is not safe to resume normal operation after 'uncaughtException'.
 * @link https://nodejs.org/api/process.html#process_warning_using_uncaughtexception_correctly
 */
process.on("uncaughtException", uncaughtExceptionHandler);

/**
 * Decorate error object with additional data
 */
app.use(errorDecorator);

/**
 * Custom error handling middleware - final
 * WARNING: Must be defined last, after other app.use(), routes calls
 * and all other error handling middleware
 */
app.use(finalErrorHandler);

/**
 * END: Error handling
 */

// Start app
const port = process.env.PORT || 2000;
app.listen(port, () =>
  winston.info(`Server running on http://localhost:${port}`)
);
