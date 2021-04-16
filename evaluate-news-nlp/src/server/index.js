const path = require("path");
const open = require("open");

const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const port = 8081;
const app = express();

app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile(path.resolve("../../dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

open(`http://localhost:${port}`);
