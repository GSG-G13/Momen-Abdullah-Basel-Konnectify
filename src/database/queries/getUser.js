const connection = require("../config/connection");

const getUser = (userName) =>
    connection.query(`SELECT * FROM users WHERE name = $1 RETURNING *;`, [userName]);

module.exports = getUser;