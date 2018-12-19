const mongoose = require('mongoose')    //esse arquivo configura a conexão com o mongodb
mongoose.Promise = global.Promise
module.exports = mongoose.connect('mongodb://localhost/aiclass') //aiclass é o nome do banco

//mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."

//mongoose.Error.messages.Number.min =
//"O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."

//mongoose.Error.messages.Number.max =
//"O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."

//mongoose.Error.messages.String.enum =
//"'{VALUE}' não é válido para o atributo '{PATH}'."