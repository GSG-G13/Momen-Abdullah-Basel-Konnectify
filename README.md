# To-Do List Web Application

This is a web application that allows users to create a to-do list, manage their tasks, and categorize them. Users can sign up for an account, log in, and create, update, and delete tasks. They can also assign tasks to categories and view their tasks by category.

## Features

- User authentication and authorization
- Task creation, updating, and deletion
- Task categorization
- View tasks by category

## Technologies Used

- Express.js for the server
- PostgreSQL for the database
- EJS for rendering views
- Passport.js for user authentication and authorization

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Create a PostgreSQL database and run the SQL commands in `database.sql` to create the necessary tables.
4. Rename the `.env.example` file to `.env` and update the variables with your own values.
5. Run the application using `npm start`.

## Screenshots

![Login page](screenshots/login.png)

![Task list page](screenshots/tasks.png)

![Category list page](screenshots/categories.png)

## Acknowledgements

This project was inspired by [Todoist](https://todoist.com/).
