var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
  nome: String,
  email:    String,
});

mongoose.model('Cliente', ClienteSchema);
