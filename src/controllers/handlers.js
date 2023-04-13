const { join } = require("path");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

require("dotenv").config();

const {
  getAllPostsQuery,
  getUser,
  addPostQuery,
  addUserQuery,
  getUserByName,
} = require("../database/queries");

const getSignUp = (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "public", "signup.html"));
};
const getSignin = (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "public", "signin.html"));
};
// Joi schema to validate incoming request data
const addUserSchema = Joi.object({
  person_name: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  profile_image: Joi.any(),
  bg_img_url: Joi.any(),
  bio: Joi.string().required(),
  skills: Joi.string().required(),
});

// Multer middleware to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const fileExt = file.originalname.split('.').pop();
      cb(null, uniqueSuffix + '.' + fileExt);
    }
  });
  

const upload = multer({ storage: storage });

// Handler function for POST /signup route
const postSignUp = (req, res) => {
  upload.fields([{ name: "profile_image" }, { name: "bg_img_url" }])(
    req,
    res,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send("Error uploading file");
      }

      // Get the uploaded file data
      const files = req.files;

      // Check if the files exist
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).send("No files uploaded");
      }

      // Get the file names and save them to the database
      const profileImageName = files["profile_image"][0].filename;
      const bgImgUrlName = files["bg_img_url"][0].filename;

      // Validate incoming request data using Joi schema
      const { error } = addUserSchema.validate(req.body);
      if (error) {
        console.error(error);
        return res.status(400).send("Invalid data");
      }

      // Check if the user already exists in the database
      getUser(req.body.email).then((data) => {
        if (data.rowCount > 0) {
          res.status(400).json({ msg: "User already exists" });
          return;
        } else {
          // Create hashed password with salt
          bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
            if (err) {
              res.status(500).json({ msg: "Server error" });
            } else {
              // Add the user to the database
              addUserQuery(
                req.body.person_name,
                req.body.username,
                req.body.email,
                hashedPassword,
                profileImageName,
                bgImgUrlName,
                req.body.bio,
                req.body.skills
              )
                .then((data) => {
                  res.status(200).send("User signed up successfully");
                })
                .catch((err) => console.log(err));
            }
          });
        }
      });
    }
  );
};

const login = (req, res) => {
  //existing user check.
  // console.log(req.body);
  const { username, password } = req.body;

  getUser(username).then((data) => {
    if (data.rows.length === 0) {
      console.log("gg");
      res.status(404).json({ msg: "User Not Found" });
      return;
    } else {
      bcrypt.compare(password, data.rows[0].password).then((result) => {
        if (!result) {
          res.status(404).json({ msg: "Invalid UserName Or Password" });
          return;
        } else {
          jwt.sign(
            { email: username },
            process.env.PRIVATE_KEY,
            function (err, token) {
              if (err) {
                console.log("err", err);
              } else {
                res.cookie("jwt", token, { maxAge: 900000, httpOnly: true });
                res.status(200);
                res.json({ msg: "Authorized" });
              }
            }
          );
        }
      });
    }
  });
};

const isAuth = (req, res, next) => {
  console.log("--------");
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.PRIVATE_KEY,
      function (err, decoded) {
        if (err) {
          res.clearCookie("jwt");
          res.status(401).json({
            error: "UnAuthorized",
          });
        } else {
          console.log("ok");
          next();
        }
      }
    );
  } else {
    res.status(401).json({
      msg: "UnAuthenticated",
    });
  }
};

const getAllPosts = (req, res) => {
  getAllPostsQuery()
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send("server error"));
};

const getProfilePage = (req, res) => {
  const { username } = req.params;

  getUserByName(username).then((data) => {
    console.log(data.rows);
    if (data.rowCount > 0) {
      res.sendFile(join(__dirname, "..", "..", "public", "profile.html"));
    } else {
      res.sendFile(join(__dirname, "..", "..", "public", "userNotFound.html"));
    }
  });
};

const getUserData = (req, res) => {
  const { username } = req.params;
  getUserByName(username)
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).send("server error"));
};

const addPost = (req, res) => {
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
          const post_text = req.body.post_text;
          const post_img = req.body.post_img;
          addPostQuery(post_text, post_img, data.rows[0].id)
            .then((data) => res.json(data.rows))
            .catch(() => res.status(500).send("server error"));
        });
      }
    });
  } else {
    res.status(400);
    res.json({ msg: "UnAuthontacited" });
  }
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
  getSignUp,
  getSignin,
  login,
  postSignUp,
  isAuth,
};
