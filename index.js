const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const mysql = require("mysql");
const cors = require("cors");

const db = [{ name: "tina" }, { name: "jack" }];

app.use(cors());
app.use(express.static("frontend/build"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

let pool = mysql.createPool(config);

app.get("/locations", (req, res) => {
  pool.query("SELECT * FROM locations", (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.send(results);
    }
  });
});

app.get("/names", (req, res) => {
  res.send(db);
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
