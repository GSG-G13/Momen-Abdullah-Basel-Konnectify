const connection = require("../config/connection");

const getUserByName = (username) =>
  connection.query(`SELECT * FROM users WHERE name = $1;`, [username]);

module.exports = getUserByName;
