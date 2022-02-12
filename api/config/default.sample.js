"use strict";

module.exports = {
  app: {
    port: 5000,
    logging: {
      file: true,
    },
  },
  db: {
    mongoose: {
      url: "<mongodb-uri>", // Required and the value must be strictly <your-mongodb-url> as it is replaced with correct Mongo DB url value in Travis CI
    },
  },
  stocks: {
    marketTradingHours: [
      {
        market: "NASDAQ", // name of market
        open: 15 * 60 + 30, // hours * 60 + minutes
        close: 22 * 60 + 0, // hours * 60 + minutes
        delay: 20, // delay in minutes
        openingDays: [1, 2, 3, 4, 5], // follows date scheme e.g. sunday = 0, monday = 1 etc.
      },
      {
        market: "COMMODITY",
        open: 0 * 60 + 0,
        close: 24 * 60 + 0,
        delay: 0,
        openingDays: [1, 2, 3, 4, 5, 6, 0],
      },
      {
        market: "CRYPTO",
        open: 0 * 60 + 0,
        close: 24 * 60 + 0,
        delay: 0,
        openingDays: [1, 2, 3, 4, 5, 6, 0],
      },
      {
        market: "FOREX",
        open: 0 * 60 + 0,
        close: 24 * 60 + 0,
        delay: 0,
        openingDays: [1, 2, 3, 4, 5, 6, 0],
      },
      {
        market: "AMEX",
        open: 15 * 60 + 30,
        close: 22 * 60 + 0,
        delay: 20,
        openingDays: [1, 2, 3, 4, 5],
      },
      {
        market: "NYSE",
        open: 15 * 60 + 30,
        close: 22 * 60 + 0,
        delay: 20,
        openingDays: [1, 2, 3, 4, 5],
      },
    ],
  },
};
