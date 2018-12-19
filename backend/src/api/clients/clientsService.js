const Clients = require('./clients')
const errorHandler = require('../common/errorHandler')

Clients.methods(['get', 'post', 'put', 'delete'])
Clients.updateOptions({new: true, runValidators: true})    //new:true - request retornar uma resposta atualizada
Clients.after('post', errorHandler). after('put', errorHandler)   //interceptar "depois" os métodos post e put para aplicar o middleware que faz o tratamento de erro                                                        //run... - valores (min..máx..etc) não valer apenas para o post

Clients.route('count', (req, res, next) => {
    Clients.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else{
            res.json({value})   // value: quantidade de elementos que existe na collection Clients
        }
    })
})

module.exports = Clients