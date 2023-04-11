const connection = require("../config/connection");

const getAllPostsQuery = () =>
  connection.query(
    "SELECT posts.user_id, name, users.img_url as user_img_url, date, posts.img_url, content FROM users INNER JOIN posts ON users.id = posts.user_id"
  );

module.exports = getAllPostsQuery;