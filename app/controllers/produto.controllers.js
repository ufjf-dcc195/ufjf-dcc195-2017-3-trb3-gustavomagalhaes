var Avaliacao = require('mongoose').model('Avaliacao');
var Produto = require('mongoose').model('Produto');

module.exports.listarEJS = function (req, res, next) {
  Produto.find({})
  .sort('nome')
  .then(
    function (produtos) {
      res.render('produto/listar', {
        produtos: produtos
      });
    },
    function (err) {
      return next(err);
    });
};

module.exports.cadastrarEJS = function (req, res, next) {
  if (req.method == 'GET') {
    res.render('produto/cadastrar');
  }
  else if (req.method == 'POST') {
    var produto = new Produto(req.body);
    produto.preco = produto.preco_base;
    produto.save().then(
      function (p) {
        res.redirect("/produto.html");
      },
      function (err) {
        return next(err);
      });
  }
}

module.exports.editarEJS = function (req, res, next) {
  if (req.method == 'GET') {
    Produto.findOne(
      { "_id": req.query.id })
      .then(
      function (produto) {
        res.render('produto/editar', { 'produto': produto });
      },
      function (err) {
        next(err);
      });
  }
  else if (req.method == 'POST') {
    Produto.findByIdAndUpdate(
      req.body.id,
      req.body,
      { new: true }
    ).then(
      function (produto) {
        res.redirect("/produto.html");
      },
      function (err) {
        return next(err);
      });
  }
}

module.exports.removerEJS = function (req, res, next) {
  if (req.method == 'GET') {
    Produto.findOne(
      { "_id": req.query.id })
      .then(
      function (produto) {
        res.render('produto/remover', { 'produto': produto });
      },
      function (err) {
        next(err);
      });
  }
  else if (req.method == 'POST') {
    Produto.findByIdAndRemove(
      req.body.id
    ).then(
      function (produto) {
        Avaliacao.remove({"id_produto": req.body.id}, function(){});
        res.redirect("/produto.html");
      },
      function (err) {
        return next(err);
      });
  }
}

module.exports.buscarEJS = function (req, res, next) {
  var termo = req.body.buscar;  
  Produto.find({
    nome: new RegExp(termo, "i")
  }).then(
    function (produtos) {
      res.render('produto/listar', {
        produtos: produtos,
        termo: termo
      });
    },
    function (err) {
      return next(err);
    });
};