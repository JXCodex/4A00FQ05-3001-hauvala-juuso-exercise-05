const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const mysql = require("mysql");

const db = [{ name: "tina" }, { name: "jack" }];

let config = {
  host: "mydb.tamk.fi",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

var connection = mysql.createConnection(config);
app.get("/", (req, res) => {
  connection.query("SELECT * FROM locations", (error, results) => {
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
