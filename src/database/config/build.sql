BEGIN;

DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    person_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img_url TEXT NOT NULL,
    bio_content TEXT,
    skills TEXT,
    bg_img_url TEXT NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    img_url TEXT,
    user_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    post_id INT REFERENCES posts(id) NOT NULL
);



-- INSERT INTO users (person_name, name,email, password, img_url, bg_img_url, bio_content, skills) VALUES 
--     ('ahmed mo','a','ahmed-mo@jkdhs','ahmed123', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Hello Iam ahmed! A front end developer', 'html,css,js,react');

-- INSERT INTO posts (content, img_url, user_id) VALUES
--     ('The Greatest!', 'https://occ-0-987-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbFI2wcwiGkHDdGWaw58hWgLETOBsbqqv6GbKnZFn3s_Y4fjw0Ys9DNYD5txnfV3oj9tgsBeaSnPcBOwQqQnpHVqHeQr9FtvVzaL.jpg?r=776', '1'),
--     ('Node.js is a cross-platform, open-source server environment that can run on Windows, Linux, Unix, macOS, and more. Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.', 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg', '1'),
--     ('Here I spend my best time.', 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '1'),
--     ('JavaScript is a dynamic programming language thats used for web development, in web applications, for game development, and lots more. It allows you to implement dynamic features on web pages that cannot be done with only HTML and CSS.', 'https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d', '1'),
--     ('Structured Query Language (SQL) is a standardized programming language that is used to manage relational databases and perform various operations on the data in them. Initially created in the 1970s, SQL is regularly used not only by database administrators, but also by developers writing data integration scripts and data analysts looking to set up and run analytical queries.', '', '1');

-- INSERT INTO comments ( content, user_id, post_id) VALUES
--     ('You are awsome', 1, 2),
--     ('You are bad', 1, 2),
--     ('You are good', 1, 1);
COMMIT;