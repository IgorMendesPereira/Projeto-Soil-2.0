const axios = require('axios');


axios.post('http://192.168.137.2:10002', Buffer.from('02', 'hex'))
    // window.location.reload()
    .then(resp => {
        console.log("teste opera = ")
    })
    .catch(e => {   //qdo o banco acusar algum erro
        console.log("erro= ", e)
    }) 



