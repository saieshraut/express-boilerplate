if (!process.env.IS_DOCKER_CONTAINER) {
  const dotenv = require("dotenv");
  let result = undefined;
  if (process.env.BACKEND_ENV)
    result = dotenv.config({
      path: `${__dirname}/.env.${process.env.BACKEND_ENV}`,
    });
  else result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

var express = require("express");
const helmet = require("helmet");

var path = require("path");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
