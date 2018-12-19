const port = 3003

const bodyParser = require ('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true })) // use o bodyParser para interpletar quando o formato for urlencoded
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser()) //convente minha string para um valor numérico / para fazer a paginação

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server