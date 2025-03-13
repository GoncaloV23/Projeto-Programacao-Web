"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const requestHandlers = require("./request-handlers");

const app = express();

app.set("view engine", "pug");
app.set("views", "./www");

app.use(bodyParser.urlencoded());

app.use(express.static("./www", {
    "index":"index.html"})
);
//app.post("/result", requestHandlers.result);

app.listen(8888, function () {
    console.log("Server running at http://localhost:8888");
});