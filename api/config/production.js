"use strict";

module.exports = {
  app: {
    port: 7000,
    logging: {
      file: false,
    },
  },
  db: {
    mongoose: {
      url: "your-mongodb-url", // Required and the value must be strictly <your-mongodb-url> as it is replaced with correct Mongo DB url value in Travis CI
    },
  },
};
