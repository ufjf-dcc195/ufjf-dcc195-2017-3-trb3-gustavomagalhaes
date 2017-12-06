var Avaliacao = require('mongoose').model('Avaliacao');
var Cliente = require('mongoose').model('Cliente');

module.exports.listarEJS = function (req, res, next) {
    Cliente.find({})
    .sort('nome')
    .then(
        function (clientes) {
            res.render('cliente/listar', {
                clientes: clientes
            });
        },
        function (err) {
            return next(err);
        });
};

module.exports.cadastrarEJS = function (req, res, next) {
    if (req.method == 'GET') {
        res.render('cliente/cadastrar');
    }
    else if (req.method == 'POST') {
        var cliente = new Cliente(req.body);
        cliente.save().then(
            function (c) {
                res.redirect("/cliente.html");
            },
            function (err) {
                return next(err);
            });
    }
}

module.exports.editarEJS = function (req, res, next) {
    if (req.method == 'GET') {
        Cliente.findOne(
            { "_id": req.query.id })
            .then(
            function (cliente) {
                res.render('cliente/editar', { 'cliente': cliente });
            },
            function (err) {
                next(err);
            });
    }
    else if (req.method == 'POST') {
        Cliente.findByIdAndUpdate(
            req.body.id,
            req.body,
            { new: true }
        ).then(
            function (cliente) {
                res.redirect("/cliente.html");
            },
            function (err) {
                return next(err);
            });
    }
}


module.exports.removerEJS = function (req, res, next) {
    if (req.method == 'GET') {
        Cliente.findOne(
            { "_id": req.query.id })
            .then(
            function (cliente) {
                res.render('cliente/remover', { 'cliente': cliente });
            },
            function (err) {
                next(err);
            });
    }
    else if (req.method == 'POST') {
        Cliente.findByIdAndRemove(
            req.body.id
        ).then(
            function (cliente) {
                Avaliacao.remove({"id_cliente": req.body.id}, function(){});
                res.redirect("/cliente.html");
            },
            function (err) {
                return next(err);
            });
    }
}

module.exports.buscarEJS = function (req, res, next) {
    var termo = req.body.buscar;
    Cliente.find({
        nome: new RegExp(termo, "i")
    }).then(
        function (clientes) {
            res.render('cliente/listar', {
                clientes: clientes,
                termo: termo
            });
        },
        function (err) {
            return next(err);
        });
};