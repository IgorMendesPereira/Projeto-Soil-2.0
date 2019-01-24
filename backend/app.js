const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
const net = require('net')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/acionamento', function (req, res) {
    console.log(req.body);
    console.log("ligar")
    let client = new net.Socket();
    client.connect(10002, '192.168.137.2', function() {
        console.log('Connected');
        client.write(Buffer.from(req.body.data, 'hex'));
        client.on('data', function(data) {
            console.log('Received: ' + data);
            if(data.toString() === '3'){
                res.status(200).json({message:'ok'})
            }else{
                res.status(200).json({message:'deu ruim'})
            }
            client.destroy(); // kill client after server's response
        });
    });
    res.status(200).json({message:'ok'})
})

// app.post('/sentido', function (req, res) {
//     console.log(req.body);
//     console.log("Sentido")
//     let client = new net.Socket();
//     client.connect(10002, '192.168.137.2', function() {
//         console.log('Sentido');
//         client.write(Buffer.from(req.body.data, 'hex'));
//         client.on('data', function(data) {
//             console.log('Received: ' + data);
//             if(data.toString() === '7'){
//                 res.status(200).json({message:'ok'})
//             }else{
//                 res.status(200).json({message:'deu ruim'})
//             }
//             client.destroy(); // kill client after server's response
//         });
//     });
//     //res.status(200).json({message:'ok'})
// })
app.get('/oi', function (req, res) {
    res.status(200).json({message:'Hello'})
})

app.listen(3000, function(err){
    if(err){
        console.log('ERROR', err);
    }else{
        console.log('Listening on port 3000');
    }
    
})