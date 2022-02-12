"use strict";

module.exports = {
  app: {
    logging: {
      file: true,
    },
  },
  db: {
    mongoose: {
      url: process.env.MONGODB_URL, // Required and the value must be strictly <your-mongodb-url> as it is replaced with correct Mongo DB url value in Travis CI
    },
  },
};
