require("dotenv").config();

const { Pool } = require("pg");

const { DB_URL } = process.env;

const connection = new Pool({
  connectionString: DB_URL,
  ssl: true,
});

module.exports = connection;
