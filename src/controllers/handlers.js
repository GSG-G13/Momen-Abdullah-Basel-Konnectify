const { join } = require("path");
const Joi = require('joi');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');


require("dotenv").config();

const {
  getAllPostsQuery,
  getUser,
  addPostQuery,
  addUserQuery,
} = require("../database/queries");

const getSignUp = (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "public", "signup.html"));
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
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
  
  const upload = multer({ storage: storage });
  
  // Handler function for POST /signup route
  const postSignUp = (req, res) => {
    upload.fields([{ name: 'profile_image' }, { name: 'bg_img_url' }])(req, res, function (err) {
      if (err) {
        console.log(err);
        return res.status(400).send('Error uploading file');
      }
      
      // Get the uploaded file data
      const files = req.files;
  
      // Check if the files exist
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).send('No files uploaded');
      }
  
      // Get the file names and save them to the database
      const profileImageName = files['profile_image'][0].filename;
      const bgImgUrlName = files['bg_img_url'][0].filename;
  
      // Validate incoming request data using Joi schema
      const { error } = addUserSchema.validate(req.body);
      if (error) {
        console.error(error);
        return res.status(400).send('Invalid data');
      }
  
      // Check if the user already exists in the database
      getUser(req.body.email).then((data) => {
        if (data.rowCount > 0) {
          res.status(400).json({ msg: 'User already exists' });
          return;
        } else {
          // Create hashed password with salt
          bcrypt.hash(req.body.password, 10, function (err, hashedPassword) {
            if (err) {
              res.status(500).json({ msg: 'Server error' });
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
                  res.status(200).send('User signed up successfully');
                })
                .catch((err) => console.log(err));
            }
          });
        }
      });
    });
  };
  

const login = (req, res) => {
  //existing user check.
  const { username, email, password } = req.body;
  getUser(username).then((data) => {
    if (data.rows.length === 0) {
      return res.status(404).json({ msg: "User Not Found" });
    } else {
      bcrypt.compare(password, data.rows[0].password).then((res) => {
        if (!res) {
          return res
            .status(404)
            .json({ message: "Invalid UserName Or Password" });
        }
      });
    }
  });

  jwt.sign(
    { username: username },
    process.env.PRIVATE_KEY,
    function (err, token) {
      if (err) {
        console.log("err", err);
      } else {
        // compare it with the token which in the Cookies.
        jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
          if (err) {
            res.clearCookie("jwt");
            res.status(401).json({
              error: "UnAuthorized",
            });
          } else {
            res.status(200).json({ msg: "Authorized" });
          }
        });
      }
    }
  );
};

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

const getsignUpUser = (req, res) => {
  res.sendFile(join(__dirname, "..", "..", "public", "signup.html"));
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
  getSignUp,
  postSignUp,
};
