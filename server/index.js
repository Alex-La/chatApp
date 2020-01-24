const express = require("express");
const http = require("http");
const cors = require("cors");
const registrRouter = require("./routes/registr.router");
const loginRouter = require("./routes/login.router");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const Users = require("./models/Users");

const PORT = 5000;
const mongoUri = "mongodb://localhost:27017/chatApp";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/api", registrRouter, loginRouter);

const server = http.createServer(app);
const io = socketio(server);

io.on("connect", socket => {
  console.log("connect");

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    server.listen(PORT, () => console.log("server ready at " + PORT));
  } catch (error) {
    console.log("server error", error.message);
    process.exit(1);
  }
};

start();
