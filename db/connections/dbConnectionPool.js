const path = require("path");
const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "production";

require("dotenv").config({
  path:
    ENV === "production"
      ? path.resolve(__dirname, "../../.env.production")
      : path.resolve(__dirname, "../../.env"),
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

module.exports = new Pool(config);
