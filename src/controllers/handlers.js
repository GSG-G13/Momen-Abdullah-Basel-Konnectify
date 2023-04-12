const { join } = require("path");

const {
  getAllPostsQuery,
  getUser,
  addPostQuery,
  addUserQuery,
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

const signUpUser =  (req, res) => {
 
  const person_name = req.body.person_name;
  const username = req.body.username;
  const email = req.body.email; // fixed typo
  const password = req.body.password;
  const img_url = req.body.img_url || '';
  const bg_img_url = req.body.bg_img_url;
  const skills = req.body.skills;

 
  try {
     addUserQuery(person_name, username, email,  password, img_url, bg_img_url, skills); // added await
    res.redirect('/signupuser');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding note to the database');
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
  signUpUser,
  getsignUpUser,
  
};
