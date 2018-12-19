const Analyze = require('./analyze')
const errorHandler = require('../common/errorHandler')

Analyze.methods(['get', 'post', 'put', 'delete'])
Analyze.updateOptions({new: true, runValidators: true})    //new:true - request retornar uma resposta atualizada
Analyze.after('post', errorHandler). after('put', errorHandler)   //interceptar "depois" os métodos post e put para aplicar o middleware que faz o tratamento de erro                                                        //run... - valores (min..máx..etc) não valer apenas para o post

Analyze.route('count', (req, res, next) => {
    Analyze.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else{
            res.json({value})   // value: quantidade de elementos que existe na collection Analyze
        }
    })
})

module.exports = Analyze