const express = require("express");

const compression = require("compression");


const router = require("./controllers");

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.disable("x-powered-by");
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(router);

module.exports = app;