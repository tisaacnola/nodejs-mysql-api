const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const postsRoute = require("./routes/posts");
const commentsRoute = require("./routes/comments");
const userRoute = require("./routes/user");
const imageRoute = require("./routes/images");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/user", userRoute);
app.use("/images", imageRoute);

module.exports = app;
