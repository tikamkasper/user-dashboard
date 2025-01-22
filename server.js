const express = require("express");
const dbconnection = require("./db/connection");
// const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();

// Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");

//db connection
dbconnection();
// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
