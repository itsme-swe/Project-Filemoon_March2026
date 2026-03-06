const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB);

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { signup, login } = require("./controller/user.controller");
const { createFile } = require("./controller/file.controller");
const app = express();
app.listen(process.env.PORT || 8080);

//🌟 app level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("view"));

app.post("/signup", signup);
app.post("/login", login);
app.post("/file", upload.single("file"), createFile); //🌟 Here we are using route level middleware
