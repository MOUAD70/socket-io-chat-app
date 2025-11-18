const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the socket.io Chat Application APIs");
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_CONNECTION_STRING;

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
