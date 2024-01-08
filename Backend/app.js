const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const configRoute = require("./Routes/config");

app.use(bodyParser.json({ limit: "1mb" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // Allow requests from this origin
    methods: ["OPTIONS", "POST", "GET", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorisation"], // Allow these headers
  })
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Origin-Agent-Cluster", "true");
  next();
});

app.use("/api/", configRoute);

mongoose
  .connect(process.env.MONGODBKEY)
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

//   app.listen(3000, () => {
//     console.log("Server is running on port 3000");
//   });