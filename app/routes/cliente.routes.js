module.exports = function (app) {
  var cliente = require("../controllers/cliente.controllers");
  app.use("/cliente.html", cliente.listarEJS);
  app.use("/cliente/cadastrar.html", cliente.cadastrarEJS);
  app.use("/cliente/editar.html", cliente.editarEJS);
  app.use("/cliente/remover.html", cliente.removerEJS);
  app.use("/cliente/buscar.html", cliente.buscarEJS);
};