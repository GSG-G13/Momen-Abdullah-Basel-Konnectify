const bcrypt = require('bcrypt');
const connection = require('../config/connection');

const addUserQuery = async (person_name, username, email, password, img_url, bg_img_url, skills) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  return connection.query(
    'INSERT INTO users (person_name, name, email, password, img_url, bg_img_url, skills) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
    [person_name, username, email, hashedPassword, img_url, bg_img_url, skills]
  );
};

module.exports = addUserQuery;
