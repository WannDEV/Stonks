const express = require("express");
const errorRouter = express.Router();

import asyncMiddleware from "./asyncMiddleware";
import clientErrorHandler from "./clientErrorHandler";
import serverErrorHandler from "./serverErrorHandler";
import {
  errorDecorator,
  finalErrorHandler,
  notFoundErrorHandler,
  unhandledRejectionHandler,
  uncaughtExceptionHandler,
} from "./errorMiddleware";

// Wrapper for catching all unexpected 500 errors
errorRouter.use(asyncMiddleware);

// Custom client and server error handlers
errorRouter.use(clientErrorHandler);
errorRouter.use(serverErrorHandler);

/**
 * Catch 404 and forward to error handler
 */
errorRouter.use(notFoundErrorHandler);

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
errorRouter.use(errorDecorator);

/**
 * Custom error handling middleware - final
 * WARNING: Must be defined last, after other app.use(), routes calls
 * and all other error handling middleware
 */
errorRouter.use(finalErrorHandler);

export default errorRouter;
