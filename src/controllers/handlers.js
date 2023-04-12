const { join } = require("path");

const jwt = require("jsonwebtoken");

require('dotenv').config()


const {
  getAllPostsQuery,
  getUser,
  addPostQuery,
  addUserQuery,
} = require("../database/queries");


const signup = (req, res) => {
    //existing user check.
    const { username, email, password, profileImageURL, backgroundImageURL, skills } = req.body;
    getUser(username).then((data) => {
        if (data.rows.length > 0) {
            return res.status(400).json({ msg: "User Already Exists" });
        } else {
            // create hashed password with salt
            bcrypt.hash(password, 10, function(err, hashedPassword) {
                if (err) {
                    res.status(500).json({ msg: "server error" });
                } else {
                    // Abdullah => here add (add user query) to add it to database.(User Creation)
                    // use hashedPassword to store password to DB.

                    // create user token and add it to cookies.
                    jwt.sign({ username: username, }, process.env.PRIVATE_KEY, function(err, token) {
                        if (err) {
                            console.log('server error');
                        } else {
                            res.cookie('jwt', token)
                                .redirect('/home');
                        }
                    });
                }
            });
        }
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
                    return res.status(404).json({ message: "Invalid UserName Or Password" });
                }
            });
        }
    });



    jwt.sign({ username: username }, process.env.PRIVATE_KEY, function(err, token) {
        if (err) {
            console.log('err', err);
        } else {

            // compare it with the token which in the Cookies.
            jwt.verify(token, process.env.PRIVATE_KEY, function(err, decoded) {
                if (err) {
                    res.clearCookie('jwt');
                    res.status(401).json({
                        error: "UnAuthorized"
                    });
                } else {
                    res.status(200).json({ msg: "Authorized" });
                }
            });
        }
    });

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
