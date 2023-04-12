const express = require("express");

const { join } = require("path");

const router = express.Router();

const {
    getAllPosts,
    getProfilePage,
    getUserData,
    addPost,
    handle404,
    handle500,
    getSignUp,
    getSignin,
    postSignUp,
    login,
} = require("./handlers");

// router.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.method);
//   next();
// });

router.get("/login", getSignin);

router.post("/login", login);

router.get("/signup", getSignUp);

router.post("/signup", postSignUp);

router.get("/home", (req, res) => {
    res.sendFile(join(__dirname, "..", "..", "public", "home.html"));
});

router.get("/posts", getAllPosts);

router.get("/user/:username", getProfilePage);

router.get("/:username/data", getUserData);

router.post("/add/post", addPost);

router.use(handle404);

router.use(handle500);

module.exports = router;