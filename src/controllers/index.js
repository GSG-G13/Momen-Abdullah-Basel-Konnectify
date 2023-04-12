const express = require("express");

const { join } = require("path");
const jwt = require("jsonwebtoken");

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
  isAuth,
} = require("./handlers");
const { getUser } = require("../database/queries");

// router.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.method);
//   next();
// });

router.get("/signin", getSignin);

router.post("/signin", login);

router.get("/signup", getSignUp);

router.post("/signup", postSignUp);

router.get("/home", (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "public", "home.html"));
});

router.get("/get-loged-user", (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        res.clearCookie("jwt");
        res.status(401).json({
          error: "UnAuthorized",
        });
      } else {
        const email = decoded.email;
        getUser(email).then((data) => {
          res.status(200).json(data.rows[0]);
        });
      }
    });
  } else {
    res.status(400);
    res.json({ msg: "UnAuthontacited" });
  }
});

router.get("/posts", getAllPosts);

router.get("/user/:username", getProfilePage);

router.get("/:username/data", getUserData);

router.post("/add/post", addPost);

router.use(handle404);

router.use(handle500);

module.exports = router;
