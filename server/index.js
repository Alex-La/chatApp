const express = require("express");
const http = require("http");
const cors = require("cors");
const authRouter = require("./routes/auth.router");
const socketio = require("socket.io");
const mongoose = require("mongoose");

const PORT = 5000;
const mongoUri =
  "mongodb+srv://alex:qwe123ewq321@cluster0-jndww.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use("/api", authRouter);

const server = http.createServer(app);
const io = socketio(server);

io.on("connect", socket => {
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

const start = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    server.listen(PORT, () => console.log("server ready at " + PORT));
  } catch (error) {
    console.log("server error", error.message);
    process.exit(1);
  }
};

start();
