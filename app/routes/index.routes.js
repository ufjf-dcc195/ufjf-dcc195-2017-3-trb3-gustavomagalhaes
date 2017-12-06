module.exports = function(app){
  var index = require("../controllers/index.controllers");
  app.use("/sobre.html", index.sobreEJS);
  app.use("/", index.indexEJS);
};
