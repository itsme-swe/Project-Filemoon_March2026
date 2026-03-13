const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect(process.env.DB);

const express = require("express");
const { v4: uniqueID } = require("uuid");
const cors = require("cors");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/");
  },
  filename: (req, file, cb) => {
    const extensionArr = file.originalname.split(".");
    const extension = extensionArr.pop();
    const uniqueName = `${uniqueID()}.${extension}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const { signup, login } = require("./controller/user.controller");
const {
  createFile,
  fetchFiles,
  deleteFile,
  downloadFile,
} = require("./controller/file.controller");
const { fetchDashboard } = require("./controller/dashboard.controller");
const { verifyToken } = require("./controller/token.controller");
const app = express();
app.listen(process.env.PORT || 8080);

//🌟 app level middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("view"));
app.use(
  cors({
    origin: "http://127.0.0.1:7976/view/signup.html",
  }),
);

//🌟 End Points
app.post("/signup", signup);
app.post("/login", login);
app.post("/file", upload.single("file"), createFile); //🌟 Here we are using route level middleware
app.get("/file", fetchFiles);
app.delete("/file/:id", deleteFile);
app.get("/file/download/:id", downloadFile);
app.get("/dashboard", fetchDashboard);
app.post("/token/verify", verifyToken);
