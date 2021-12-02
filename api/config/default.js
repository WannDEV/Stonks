"use strict";

require("dotenv").config();

module.exports = {
  app: {
    port: 5000,
    logging: {
      file: true,
    },
  },
  db: {
    mongoose: {
      url: process.env.MONGODB_URL, // Required and the value must be strictly <your-mongodb-url> as it is replaced with correct Mongo DB url value in Travis CI
    },
  },
  auth: {
    google: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
};
