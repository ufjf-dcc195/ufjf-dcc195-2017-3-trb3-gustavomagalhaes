var Cliente = require('mongoose').model('Cliente');
var Produto = require('mongoose').model('Produto');
var Avaliacao = require('mongoose').model('Avaliacao');

module.exports.inicioEJS = function (req, res, next) {
    Cliente.find({})
        .sort('nome')
        .then(
        function (clientes) {
            res.render('avaliacao/inicio', {
                clientes: clientes
            });
        },
        function (err) {
            return next(err);
        });
}

module.exports.avaliarEJS = function (req, res, next) {
    req.session.cliente = req.body.cliente;
    var produtos;
    Produto.find({})
        .then(function (prods) {
            var itemsProcessed = 0;
            produtos = prods;
            prods.forEach(function (p, i, arr) {
                Avaliacao.findOne({
                    "id_cliente": req.body.cliente,
                    "id_produto": p._id
                }).then(function (a) {
                    itemsProcessed++;
                    if (a) {
                        p.avaliacao = a.avaliacao
                    }
                    if (itemsProcessed === arr.length) {
                        render();
                    }
                });
            });
        }, function (err) {
            next(err);
        });

    function render() {
        res.render('avaliacao/avaliar', {
            'cliente_id': req.body.cliente,
            'produtos': produtos
        });
    }
}

module.exports.salvarEJS = function (req, res, next) {
    let promises = [];
    var itemsProcessed = 1;
    Object.keys(req.body).forEach(function (k, i, arr) {
        if (k.substring(0, 5) === 'prod.') {
            promises.push(
                Avaliacao.findOne({
                    id_cliente: req.body.cliente,
                    id_produto: k.substring(5)
                }).then(function (a) {
                    itemsProcessed++;
                    if (a) {
                        Avaliacao.findByIdAndUpdate(
                            a._id, {
                                $set: {
                                    avaliacao: req.body[k]
                                }
                            }).then(function (a) {
                            });
                    } else {
                        Avaliacao.create({
                            id_cliente: req.body.cliente,
                            id_produto: k.substring(5),
                            avaliacao: req.body[k]
                        }).then(function (a) {
                        }, function (err) {
                            next(err);
                        });
                    }
                    if (itemsProcessed === arr.length) {
                        render();
                    }
                }, function (err) {
                    next(err);
                })
            )
        }
    });

    function render() {
        res.redirect("avaliacao.html")
    };
}

module.exports.precosEJS = function (req, res, next) {
    var ps = 0, as = 0;
    var prodObjs = [];
    var pObj;
    Produto.find({})
        .sort('nome')
        .then(function (produtos) {
            produtos.forEach(function (p, i, arr) {
                ps++;
                pObj = p.toObject();
                pObj.avaliacao = 0;
                prodObjs.push(pObj);
            });
            prodObjs.forEach(function (p, i, arr) {
                Avaliacao.find({
                    "id_produto": p._id
                }).cursor()
                    .on('data', function (a) {
                        p.avaliacao += a.avaliacao;
                    })
                    .on('error', function (err) {
                        next(err);
                    })
                    .on('end', function () {
                        as++;
                        processar();
                    });
            });
        }, function (err) {
            next(err);
        })

    function processar() {
        if (ps === as) {
            processarProdutos(prodObjs);
        }
    }

    function processarProdutos(produtos) {
        var maior = -1, menor = Number.POSITIVE_INFINITY;
        produtos.forEach(function (p, i, arr) {
            if (p.avaliacao > maior) maior = p.avaliacao;
            if (p.avaliacao < menor) menor = p.avaliacao;
        });

        var itemsProcessed = 0;
        produtos.forEach(function (p, i, arr) {
            Produto.findOneAndUpdate(
                { "_id": p._id },
                { "preco": p.preco_base * (1 + (maior === menor ? 0 : (p.avaliacao - menor) / (maior - menor))) }
            ).then(function (p) {
                itemsProcessed++;
                if (itemsProcessed == arr.length) {
                    render(arr);
                }
            }, function (err) {
                next(err);
            });
        });

        function render(produtos) {
            res.render('avaliacao/precos', {
                'produtos': produtos
            });
        }
    }
}

module.exports.buscarEJS = function (req, res, next) {
    var termo = req.body.buscar;
    Produto.find({
        nome: new RegExp(termo, "i")
    })
        .sort('nome')
        .then(function (produtos) {
            res.render('avaliacao/precos', {
                produtos: produtos,
                termo: termo
            });
        },
        function (err) {
            return next(err);
        });
}