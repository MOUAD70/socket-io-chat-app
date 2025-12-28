const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const chatRoute = require("./routes/chatRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the socket.io Chat Application APIs");
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection established");

    app.listen(port, (req, res) => {
      console.log(`The server is running on port: ${port} `);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed: ", err.message);
  });
