module.exports = function(app){
    var produto = require("../controllers/produto.controllers");
    app.use("/produto.html", produto.listarEJS);
    app.use("/produto/cadastrar.html", produto.cadastrarEJS);
    app.use("/produto/editar.html", produto.editarEJS);
    app.use("/produto/remover.html", produto.removerEJS);
    app.use("/produto/buscar.html", produto.buscarEJS);
  };
  