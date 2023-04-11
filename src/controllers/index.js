const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  getProfilePage,
  getUserData,
  addPost,
  handle404,
  handle500,
} = require("./handlers");

router.get("/posts", getAllPosts);

router.get("/user/:username", getProfilePage);

router.get("/:username/data", getUserData);

router.post("/add/post", addPost);

router.use(handle404);

router.use(handle500);

module.exports = router;
