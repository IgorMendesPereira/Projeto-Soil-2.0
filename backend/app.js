const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const cors = require('cors')
const net = require('net')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

setInterval(() => {
    let client = new net.Socket();
    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.on('data', function (data) {
            console.log('Received: ' + data.toString());
            io.emit("status", data.toString());
            client.destroy(); // kill client after server's response
        });
    }); 
}, 10000)


app.post('/acionamento', function (req, res) {
    console.log(req.body);
    console.log("ligar")
    let client = new net.Socket();

    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.write(Buffer.from(req.body.data, 'hex'));
        client.on('data', function (data) {
            console.log('Received: ' + data);
            console.log('oi')
            client.destroy();
                if ( data.toString() === '3') {
                    res.status(200).json({ message: 'Pressurizou' })
                }
                else if ( data.toString() === '9') {
                    res.status(200).json({ message: 'Não Presurizou' })
                }
                else if ( data.toString() === '4') {
                    res.status(200).json({ message: 'Desligado' })
                }
                else {
                    res.status(200).json({ message: 'Deu ruim' })
                }
        });

    });

})


//FEITO POR RAFAELA
app.post('/sentido', function (req, res) {
    console.log(req.body);
    console.log("Avanco")
    let client = new net.Socket();
    client.connect(10003, '192.168.137.2', function () {
        console.log('Connected');
        client.write(Buffer.from(req.body.data, 'hex'));
        client.on('data', function (data) {
            console.log('Received: ' + data);
            if (data.toString() === '7') {
                res.status(200).json({ message: 'Avanco ok' })
            }
            if (data.toString() === '8') {
                res.status(200).json({ message: 'Reverso ok' })
            }
            else {
                res.status(200).json({ message: 'deu ruim' })
            }
            client.destroy(); // kill client after server's response
        });
    });
    //res.status(200).json({message:'ok'})
})

const server = require('http').createServer(app);

server.listen(3000, function (err) {
    if (err) {
        console.log('ERROR', err);
    } else {
        console.log('Listening on port 3000');
    }
})


const io = require('socket.io')(server);
io.on("connection", socket => {
    console.log("New client connected")
    socket.on('status', data => { 
        console.log(data) 
        socket.broadcast.emit('status', {
            device: "01",
            data: data
        });
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});