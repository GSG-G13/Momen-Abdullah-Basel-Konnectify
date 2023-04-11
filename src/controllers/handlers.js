const { join } = require("path");

const {
  getAllPostsQuery,
  getUser,
  addPostQuery,
} = require("../database/queries");

const getAllPosts = (req, res) => {
  getAllPostsQuery()
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send("server error"));
};

const getProfilePage = (req, res) => {
  const { username } = req.params;

  getUser(username).then((data) => {
    if (data.rowCount > 0) {
      res.sendFile(join(__dirname, "..", "..", "public", "profile.html"));
    } else {
      res.sendFile(join(__dirname, "..", "..", "public", "userNotFound.html"));
    }
  });
};

const getUserData = (req, res) => {
  const { username } = req.params;
  getUser(username)
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send("server error"));
};

const addPost = (req, res) => {
  const post_text = req.body.post_text;
  const post_img = req.body.post_img;

  addPostQuery(post_text, post_img)
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send("server error"));
};

const handle404 = (req, res) => {
  res.status(404).send("404 error");
};

const handle500 = (err, req, res, next) => {
  res.status(500).send("500 error");
};

module.exports = {
  getAllPosts,
  getProfilePage,
  getUserData,
  addPost,
  handle404,
  handle500,
};
