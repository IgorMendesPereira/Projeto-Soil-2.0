const restful = require('node-restful')
const mongoose = restful.mongoose

const clientsSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Informe o nome!"] },
    telephone: { type: Number, maxlenght:15 , required: [true, "Informe o telefone de contato!"] },
    city: { type: String, required: [true, "Informe o nome cidade!"] },
    propertyname: { type: String, required: [true, "Informe o nome da propriedade!"] },
    createdAT: { type: Date, default: Date.now },
})


module.exports = restful.model('Clients', clientsSchema)