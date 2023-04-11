const connection = require("../config/connection");

const getUser = (userName) =>
  connection.query(`SELECT * FROM users WHERE name = $1;`, [userName]);

module.exports = getUser;
