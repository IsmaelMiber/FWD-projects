require("dotenv").config({
  path: "./.env.prod",
});
const path = require("path");
const open = require("open");
const { classifiyText } = require("../client/API/form");

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

app.get("/classify", async function (req, res, proxyOptions) {
  const { query } = req;
  const { text } = query;
  const response = await classifiyText(text);

  const responseJson = await response.json();
  res.send(responseJson);
});

open(`http://localhost:${port}`);
