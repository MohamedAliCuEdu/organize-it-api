const express = require("express");
const mongoose = require("mongoose");
const { default: helmet } = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { conCompassDB } = require("./config/connectDB");
const corsOptions = require("./utils/corsOptions");

const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const taskRoute = require("./routes/task.route");
const noteRoute = require("./routes/note.route");
const archiveNotesRoute = require("./routes/archiveNotes.route");
const messageRoute = require("./routes/message.route");

const app = express();

// ________________middlewares:
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors(corsOptions));
// app.use(cors());
// ________________ main route:
app.all("/", (req, res) => {
  res.send("hello from orgsnize-it api server!");
});
// ________________routes:
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/tasks", taskRoute);
app.use("/notes", noteRoute);
app.use("/archive-notes", archiveNotesRoute);
app.use("/messages", messageRoute);

//_________________handling errors:
app.use((err, req, res, nxt) => {
  console.log(err.message);
  console.log(err);
  res.status(400).json(err);
});
// ________________unknown routes:
app.use("/*", (req, res) => {
  console.log("unkwon url");
  res.status(404).send("not found!");
});

// ________________connect to database & run the server:
conCompassDB(process.env.DATABASE_URI);
mongoose.connection.once("open", () => {
  app.listen(process.env.PORT || 4000, () => {
    console.log("organizeIt-api server: running...");
  });
});
