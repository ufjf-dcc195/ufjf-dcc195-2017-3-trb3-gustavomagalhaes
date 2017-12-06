var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvaliacaoSchema = new Schema({
    id_cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    id_produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto'
    },
    avaliacao: Number,
});

mongoose.model('Avaliacao', AvaliacaoSchema);
