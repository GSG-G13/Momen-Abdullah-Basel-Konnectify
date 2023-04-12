const bcrypt = require("bcrypt");
const connection = require("../config/connection");

const addUserQuery = (
  person_name,
  username,
  email,
  hashedPassword,
  profile_image,
  bg_img_url,
  bio,
  skills
) => {
  return connection.query(
    "INSERT INTO users (person_name, name, email, password, img_url,bg_img_url, skills, bio_content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
    [
      person_name,
      username,
      email,
      hashedPassword,
      profile_image,
      bg_img_url,
      bio,
      skills,
    ]
  );
};

module.exports = addUserQuery;
