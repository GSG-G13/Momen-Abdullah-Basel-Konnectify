const connection = require("../config/connection");

const addPostQuery = (post_text, post_img, user_id) => {
  return connection.query(
    "INSERT INTO posts (content, img_url, user_id) VALUES ($1, $2, $3) RETURNING *;",
    [post_text, post_img, user_id]
  );
};

module.exports = addPostQuery;
