const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { Pool } = require("pg");
// console.log("PGDATABASE:", process.env.PGDATABASE);
const pool = new Pool();
module.exports = pool;
