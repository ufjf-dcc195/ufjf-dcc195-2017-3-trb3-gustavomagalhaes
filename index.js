var express = require("./config/express");
var mongoose = require("./config/mongoose")

var db = mongoose();
var app = express();

var port = process.env.PORT || 3000

app.listen(port);

module.exports = app;
