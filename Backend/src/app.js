const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./Routes/user.route");
const subjectRoute = require("./Routes/subject.route");
const taskRoute = require("./Routes/task.route");
const noteRoute = require("./Routes/note.route");

const app = express();

const allowedOrigins = [
  "https://darkie-study-hub.vercel.app",
  "https://studyhub-1ln4.onrender.com",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/api/auth", userRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/task", taskRoute);
app.use("/api/note", noteRoute);

module.exports = app;
