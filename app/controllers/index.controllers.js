module.exports.indexEJS = function (req, res, next) {
  res.render('index', {
    titulo: "DCC195 - Trabalho 3",
    links: [
      { name: "Manutenção do produto", url: "produto.html" },
      { name: "Manutenção do cliente", url: "cliente.html" },
      { name: "Avaliação dos produtos", url: "avaliacao.html" },
      { name: "Lista de preços dos produtos", url: "preco_produtos.html" },
      { name: "Sobre", url: "sobre.html" }
    ]
  });
}

module.exports.sobreEJS = function (req, res, next) {
  res.render('sobre', {
    titulo: "DCC195 - Trabalho 3 - Sobre",
    nome: "Gustavo Magalhães Moura",
    matricula: "201235015",
    email: "gmmoura@ice.ufjf.br",
    curso: "Ciência da Computação"
  });
}
