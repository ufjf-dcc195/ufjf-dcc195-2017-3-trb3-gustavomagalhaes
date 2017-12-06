module.exports = function (app) {
    var avaliacao = require("../controllers/avaliacao.controllers");
    app.use("/avaliacao.html", avaliacao.inicioEJS);
    app.use("/avaliacao/avaliar.html", avaliacao.avaliarEJS);
    app.use("/avaliacao/salvar.html", avaliacao.salvarEJS);
    app.use("/preco_produtos.html", avaliacao.precosEJS);
    app.use("/avaliacao/buscar.html", avaliacao.buscarEJS);
};